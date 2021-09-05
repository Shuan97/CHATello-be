import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'broadcast' })
// @WebSocketGateway()
export class BroadcastGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  // constructor() {}

  @WebSocketServer()
  server: Server;

  private activeSockets: {
    id: string;
    channel: string;
    channelName: string;
    user: string;
    userName: string;
  }[] = [];

  private logger: Logger = new Logger('BroadcastGateway');
  private messageLogger: Logger = new Logger('Broadcast');

  logActiveSockets = (text) => {
    this.messageLogger.log(
      `${text}: ${JSON.stringify(this.activeSockets, null, 2)}`,
    );
  };

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    client.emit('me', client.id);
    this.server.emit(`update-user-list`, {
      users: this.activeSockets.map((socket) => ({
        clientId: socket.id,
        channelUUID: socket.channel,
        channelName: socket.channelName,
        userUUID: socket.user,
        userName: socket.userName,
      })),
      type: 'updateUserList',
    });
  }

  afterInit() {
    this.logger.log('\x1b[35mBroadcast websocket initialized!', 'Websocket');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(
      `\x1b[31mBroadcast client disconnected: ${client.id}\x1b[0m`,
    );

    const existingSocket = this.activeSockets.find(
      (socket) => socket.id === client.id,
    );

    if (!existingSocket) return;

    this.activeSockets = this.activeSockets.filter(
      (socket) => socket.id !== client.id,
    );

    this.logActiveSockets('Active sockets after disconnection');
  }

  @SubscribeMessage('join-channel')
  public async joinChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    const { channelUUID, channelName, userUUID, userName } = data;
    this.messageLogger.log(
      `\x1b[36m\n==========\n> User ${userName} [${userUUID}]\n> Joined channel ${channelName} [${channelUUID}]\n==========`,
    );

    const existingSocket = this.activeSockets.find(
      // (socket) => socket.channel === channelUUID && socket.id === client.id,
      (socket) =>
        socket.channel === channelUUID &&
        socket.user === userUUID &&
        socket.id === client.id,
    );

    if (!!existingSocket) {
      this.messageLogger.log('Socket existing!');
    }

    if (!existingSocket) {
      this.messageLogger.log('Socket not existing!');
      this.activeSockets = [
        ...this.activeSockets,
        {
          id: client.id,
          channel: channelUUID,
          channelName,
          user: userUUID,
          userName,
        },
      ];
      // client.emit(`update-user-list`, {
      //   users: this.activeSockets
      //     // .filter(
      //     //   (socket) =>
      //     //     socket.channel === channelUUID &&
      //     //     // socket.user !== userUUID &&
      //     //     socket.id !== client.id,
      //     // )
      //     .map((_existingSocket) => ({
      //       clientId: _existingSocket,
      //       channelUUID,
      //       channelName,
      //       userName,
      //       userUUID,
      //     })),
      //   type: 'updateUserList',
      // });

      // client.broadcast.emit(`${channelUUID}-update-user-list`, {

      // client.broadcast.emit(`update-user-list`, {
      //   users: [
      //     { clientId: client.id, channelUUID, channelName, userUUID, userName },
      //   ],
      //   type: 'updateSingleUser',
      // });
    }
    this.server.emit(`update-user-list`, {
      users: this.activeSockets.map((socket) => ({
        clientId: socket.id,
        channelUUID: socket.channel,
        channelName: socket.channelName,
        userUUID: socket.user,
        userName: socket.userName,
      })),
      type: 'updateUserList',
    });

    this.server.emit(`user-joined-channel`, {
      user: {
        clientId: client.id,
        channelUUID,
        channelName,
        userUUID,
        userName,
      },
      type: 'updateSingleUser',
    });
    // client.broadcast.emit(`update-user-list`, {
    //   users: this.activeSockets.map((socket) => ({
    //     clientId: socket.id,
    //     channelUUID,
    //     channelName,
    //     userName,
    //     userUUID,
    //   })),
    //   type: 'updateUserList',
    // });
    this.logActiveSockets('Active sockets after join');
  }

  @SubscribeMessage('disconnect-channel')
  public async disconnectChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    const { channelUUID, channelName, userUUID, userName } = data;
    const existingSocket = this.activeSockets.find(
      // (socket) => socket.channel === channelUUID && socket.id === client.id,
      (socket) =>
        socket.channel === channelUUID &&
        socket.user === userUUID &&
        socket.id === client.id,
    );

    if (!existingSocket) return;

    this.activeSockets = this.activeSockets.filter(
      (socket) =>
        // socket.channel !== channelUUID &&
        socket.user !== userUUID && socket.id !== client.id,
    );

    this.messageLogger.log(
      `\x1b[31m\n==========\n> User ${userName} [${userUUID}]\n> Disconnected channel ${channelName} [${channelUUID}]\n==========`,
    );

    this.logActiveSockets('Active sockets after disconnect');
  }

  @SubscribeMessage('peer-connection')
  public async peerConnection(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    this.messageLogger.log(`Peer-connection: ${data}`);
    this.server.emit('peer-connection', data);
  }
}
