import { WorkspaceFoldersChangeEvent as VWorkspaceFoldersChangeEvent } from './vscode';
import { DynamicFeature, RegistrationData, BaseLanguageClient, NextSignature } from './client';
import { ClientCapabilities, InitializedParams, Proposed, RPCMessageType } from 'vscode-languageserver-protocol';
export interface WorkspaceFolderMiddleware {
  workspace?: {
    workspaceFolders?: Proposed.WorkspaceFoldersRequest.MiddlewareSignature;
    didChangeWorkspaceFolders?: NextSignature<VWorkspaceFoldersChangeEvent, void>;
  };
}
export declare class WorkspaceFoldersFeature implements DynamicFeature<undefined> {
  private _client;
  private _listeners;
  constructor(_client: BaseLanguageClient);
  readonly messages: RPCMessageType;
  fillInitializeParams(params: InitializedParams): void;
  fillClientCapabilities(capabilities: ClientCapabilities): void;
  initialize(): void;
  register(_message: RPCMessageType, data: RegistrationData<undefined>): void;
  unregister(id: string): void;
  dispose(): void;
  private asProtocol(workspaceFolder);
  private asProtocol(workspaceFolder);
  private getWorkspaceFolderMiddleware();
}
