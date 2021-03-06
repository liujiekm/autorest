import { TextDocumentChangeEvent, TextDocument, Disposable, OutputChannel, FileSystemWatcher as VFileSystemWatcher, DiagnosticCollection, ProviderResult, CancellationToken, Position as VPosition, Location as VLocation, Range as VRange, CompletionItem as VCompletionItem, CompletionList as VCompletionList, SignatureHelp as VSignatureHelp, Definition as VDefinition, DocumentHighlight as VDocumentHighlight, SymbolInformation as VSymbolInformation, CodeActionContext as VCodeActionContext, Command as VCommand, CodeLens as VCodeLens, FormattingOptions as VFormattingOptions, TextEdit as VTextEdit, WorkspaceEdit as VWorkspaceEdit, Hover as VHover, DocumentLink as VDocumentLink, TextDocumentWillSaveEvent, WorkspaceFolder as VWorkspaceFolder } from './vscode';
import { Message, RPCMessageType, ResponseError, RequestType, RequestType0, RequestHandler, RequestHandler0, GenericRequestHandler, NotificationType, NotificationType0, NotificationHandler, NotificationHandler0, GenericNotificationHandler, MessageReader, MessageWriter, Trace, Event, ClientCapabilities, InitializeParams, InitializeResult, InitializeError, ServerCapabilities, DocumentSelector } from 'vscode-languageserver-protocol';
import * as c2p from './codeConverter';
import * as p2c from './protocolConverter';
export { Converter as Code2ProtocolConverter } from './codeConverter';
export { Converter as Protocol2CodeConverter } from './protocolConverter';
export * from 'vscode-languageserver-protocol';
export interface ExecutableOptions {
  cwd?: string;
  stdio?: string | string[];
  env?: any;
  detached?: boolean;
}
export interface Executable {
  command: string;
  args?: string[];
  options?: ExecutableOptions;
}
export interface ForkOptions {
  cwd?: string;
  env?: any;
  encoding?: string;
  execArgv?: string[];
}
export declare enum TransportKind {
  stdio = 0,
  ipc = 1,
  pipe = 2,
}
export interface NodeModule {
  module: string;
  transport?: TransportKind;
  args?: string[];
  runtime?: string;
  options?: ForkOptions;
}
/**
 * An action to be performed when the connection is producing errors.
 */
export declare enum ErrorAction {
  /**
   * Continue running the server.
   */
  Continue = 1,
  /**
   * Shutdown the server.
   */
  Shutdown = 2,
}
/**
 * An action to be performed when the connection to a server got closed.
 */
export declare enum CloseAction {
  /**
   * Don't restart the server. The connection stays closed.
   */
  DoNotRestart = 1,
  /**
   * Restart the server.
   */
  Restart = 2,
}
/**
 * A pluggable error handler that is invoked when the connection is either
 * producing errors or got closed.
 */
export interface ErrorHandler {
  /**
   * An error has occurred while writing or reading from the connection.
   *
   * @param error - the error received
   * @param message - the message to be delivered to the server if know.
   * @param count - a count indicating how often an error is received. Will
   *  be reset if a message got successfully send or received.
   */
  error(error: Error, message: Message, count: number): ErrorAction;
  /**
   * The connection to the server got closed.
   */
  closed(): CloseAction;
}
export interface InitializationFailedHandler {
  (error: ResponseError<InitializeError> | Error | any): boolean;
}
export interface SynchronizeOptions {
  configurationSection?: string | string[];
  fileEvents?: VFileSystemWatcher | VFileSystemWatcher[];
}
export declare enum RevealOutputChannelOn {
  Info = 1,
  Warn = 2,
  Error = 3,
  Never = 4,
}
export interface ProvideCompletionItemsSignature {
  (document: TextDocument, position: VPosition, token: CancellationToken): ProviderResult<VCompletionItem[] | VCompletionList>;
}
export interface ResolveCompletionItemSignature {
  (item: VCompletionItem, token: CancellationToken): ProviderResult<VCompletionItem>;
}
export interface ProvideHoverSignature {
  (document: TextDocument, position: VPosition, token: CancellationToken): ProviderResult<VHover>;
}
export interface ProvideSignatureHelpSignature {
  (document: TextDocument, position: VPosition, token: CancellationToken): ProviderResult<VSignatureHelp>;
}
export interface ProvideDefinitionSignature {
  (document: TextDocument, position: VPosition, token: CancellationToken): ProviderResult<VDefinition>;
}
export interface ProvideReferencesSignature {
  (document: TextDocument, position: VPosition, options: {
    includeDeclaration: boolean;
  }, token: CancellationToken): ProviderResult<VLocation[]>;
}
export interface ProvideDocumentHighlightsSignature {
  (document: TextDocument, position: VPosition, token: CancellationToken): ProviderResult<VDocumentHighlight[]>;
}
export interface ProvideDocumentSymbolsSignature {
  (document: TextDocument, token: CancellationToken): ProviderResult<VSymbolInformation[]>;
}
export interface ProvideWorkspaceSymbolsSignature {
  (query: string, token: CancellationToken): ProviderResult<VSymbolInformation[]>;
}
export interface ProvideCodeActionsSignature {
  (document: TextDocument, range: VRange, context: VCodeActionContext, token: CancellationToken): ProviderResult<VCommand[]>;
}
export interface ProvideCodeLensesSignature {
  (document: TextDocument, token: CancellationToken): ProviderResult<VCodeLens[]>;
}
export interface ResolveCodeLensSignature {
  (codeLens: VCodeLens, token: CancellationToken): ProviderResult<VCodeLens>;
}
export interface ProvideDocumentFormattingEditsSignature {
  (document: TextDocument, options: VFormattingOptions, token: CancellationToken): ProviderResult<VTextEdit[]>;
}
export interface ProvideDocumentRangeFormattingEditsSignature {
  (document: TextDocument, range: VRange, options: VFormattingOptions, token: CancellationToken): ProviderResult<VTextEdit[]>;
}
export interface ProvideOnTypeFormattingEditsSignature {
  (document: TextDocument, position: VPosition, ch: string, options: VFormattingOptions, token: CancellationToken): ProviderResult<VTextEdit[]>;
}
export interface ProvideRenameEditsSignature {
  (document: TextDocument, position: VPosition, newName: string, token: CancellationToken): ProviderResult<VWorkspaceEdit>;
}
export interface ProvideDocumentLinksSignature {
  (document: TextDocument, token: CancellationToken): ProviderResult<VDocumentLink[]>;
}
export interface ResolveDocumentLinkSignature {
  (link: VDocumentLink, token: CancellationToken): ProviderResult<VDocumentLink>;
}
export interface NextSignature<P, R> {
  (data: P, next: (data: P) => R): R;
}
export interface DidChangeConfigurationSignature {
  (sections: string[] | undefined): void;
}
export interface WorkspaceMiddleware {
  didChangeConfiguration?: (sections: string[] | undefined, next: DidChangeConfigurationSignature) => void;
}
export interface Middleware {
  didOpen?: NextSignature<TextDocument, void>;
  didChange?: NextSignature<TextDocumentChangeEvent, void>;
  willSave?: NextSignature<TextDocumentWillSaveEvent, void>;
  willSaveWaitUntil?: NextSignature<TextDocumentWillSaveEvent, Thenable<VTextEdit[]>>;
  didSave?: NextSignature<TextDocument, void>;
  didClose?: NextSignature<TextDocument, void>;
  provideCompletionItem?: (document: TextDocument, position: VPosition, token: CancellationToken, next: ProvideCompletionItemsSignature) => ProviderResult<VCompletionItem[] | VCompletionList>;
  resolveCompletionItem?: (item: VCompletionItem, token: CancellationToken, next: ResolveCompletionItemSignature) => ProviderResult<VCompletionItem>;
  provideHover?: (document: TextDocument, position: VPosition, token: CancellationToken, next: ProvideHoverSignature) => ProviderResult<VHover>;
  provideSignatureHelp?: (document: TextDocument, position: VPosition, token: CancellationToken, next: ProvideSignatureHelpSignature) => ProviderResult<VSignatureHelp>;
  provideDefinition?: (document: TextDocument, position: VPosition, token: CancellationToken, next: ProvideDefinitionSignature) => ProviderResult<VDefinition>;
  provideReferences?: (document: TextDocument, position: VPosition, options: {
    includeDeclaration: boolean;
  }, token: CancellationToken, next: ProvideReferencesSignature) => ProviderResult<VLocation[]>;
  provideDocumentHighlights?: (document: TextDocument, position: VPosition, token: CancellationToken, next: ProvideDocumentHighlightsSignature) => ProviderResult<VDocumentHighlight[]>;
  provideDocumentSymbols?: (document: TextDocument, token: CancellationToken, next: ProvideDocumentSymbolsSignature) => ProviderResult<VSymbolInformation[]>;
  provideWorkspaceSymbols?: (query: string, token: CancellationToken, next: ProvideWorkspaceSymbolsSignature) => ProviderResult<VSymbolInformation[]>;
  provideCodeActions?: (document: TextDocument, range: VRange, context: VCodeActionContext, token: CancellationToken, next: ProvideCodeActionsSignature) => ProviderResult<VCommand[]>;
  provideCodeLenses?: (document: TextDocument, token: CancellationToken, next: ProvideCodeLensesSignature) => ProviderResult<VCodeLens[]>;
  resolveCodeLens?: (codeLens: VCodeLens, token: CancellationToken, next: ResolveCodeLensSignature) => ProviderResult<VCodeLens>;
  provideDocumentFormattingEdits?: (document: TextDocument, options: VFormattingOptions, token: CancellationToken, next: ProvideDocumentFormattingEditsSignature) => ProviderResult<VTextEdit[]>;
  provideDocumentRangeFormattingEdits?: (document: TextDocument, range: VRange, options: VFormattingOptions, token: CancellationToken, next: ProvideDocumentRangeFormattingEditsSignature) => ProviderResult<VTextEdit[]>;
  provideOnTypeFormattingEdits?: (document: TextDocument, position: VPosition, ch: string, options: VFormattingOptions, token: CancellationToken, next: ProvideOnTypeFormattingEditsSignature) => ProviderResult<VTextEdit[]>;
  provideRenameEdits?: (document: TextDocument, position: VPosition, newName: string, token: CancellationToken, next: ProvideRenameEditsSignature) => ProviderResult<VWorkspaceEdit>;
  provideDocumentLinks?: (document: TextDocument, token: CancellationToken, next: ProvideDocumentLinksSignature) => ProviderResult<VDocumentLink[]>;
  resolveDocumentLink?: (link: VDocumentLink, token: CancellationToken, next: ResolveDocumentLinkSignature) => ProviderResult<VDocumentLink>;
  workspace?: WorkspaceMiddleware;
}
export interface LanguageClientOptions {
  documentSelector?: DocumentSelector | string[];
  synchronize?: SynchronizeOptions;
  diagnosticCollectionName?: string;
  outputChannel?: OutputChannel;
  outputChannelName?: string;
  revealOutputChannelOn?: RevealOutputChannelOn;
  /**
   * The encoding use to read stdout and stderr. Defaults
   * to 'utf8' if ommitted.
   */
  stdioEncoding?: string;
  initializationOptions?: any | (() => any);
  initializationFailedHandler?: InitializationFailedHandler;
  errorHandler?: ErrorHandler;
  middleware?: Middleware;
  uriConverters?: {
    code2Protocol: c2p.URIConverter;
    protocol2Code: p2c.URIConverter;
  };
  workspaceFolder?: VWorkspaceFolder;
}
export declare enum State {
  Stopped = 1,
  Running = 2,
}
export interface StateChangeEvent {
  oldState: State;
  newState: State;
}
/**
 * A static feature. A static feature can't be dynamically activate via the
 * server. It is wired during the initialize sequence.
 */
export interface StaticFeature {
  /**
   * Called to fill the initialize params.
   *
   * @params the initialize params.
   */
  fillInitializeParams?: (params: InitializeParams) => void;
  /**
   * Called to fill in the client capabilities this feature implements.
   *
   * @param capabilities The client capabilities to fill.
   */
  fillClientCapabilities(capabilities: ClientCapabilities): void;
  /**
   * Initialize the feature. This method is called on a feature instance
   * when the client has successfully received the initalize request from
   * the server and before the client sends the initialized notification
   * to the server.
   *
   * @param capabilities the server capabilities
   * @param documentSelector the document selector pass to the client's constuctor.
   *  May be `undefined` if the client was created without a selector.
   */
  initialize(capabilities: ServerCapabilities, documentSelector: DocumentSelector | undefined): void;
}
export interface RegistrationData<T> {
  id: string;
  registerOptions: T;
}
export interface DynamicFeature<T> {
  /**
   * The message for which this features support dynamic activation / registration.
   */
  messages: RPCMessageType | RPCMessageType[];
  /**
   * Called to fill the initialize params.
   *
   * @params the initialize params.
   */
  fillInitializeParams?: (params: InitializeParams) => void;
  /**
   * Called to fill in the client capabilities this feature implements.
   *
   * @param capabilities The client capabilities to fill.
   */
  fillClientCapabilities(capabilities: ClientCapabilities): void;
  /**
   * Initialize the feature. This method is called on a feature instance
   * when the client has successfully received the initalize request from
   * the server and before the client sends the initialized notification
   * to the server.
   *
   * @param capabilities the server capabilities.
   * @param documentSelector the document selector pass to the client's constuctor.
   *  May be `undefined` if the client was created without a selector.
   */
  initialize(capabilities: ServerCapabilities, documentSelector: DocumentSelector | undefined): void;
  /**
   * Is called when the server send a register request for the given message.
   *
   * @param message the message to register for.
   * @param data additional registration data as defined in the protocol.
   */
  register(message: RPCMessageType, data: RegistrationData<T>): void;
  /**
   * Is called when the server wants to unregister a feature.
   *
   * @param id the id used when registering the feature.
   */
  unregister(id: string): void;
  /**
   * Called when the client is stopped to dispose this feature. Usually a feature
   * unregisters listeners registerd hooked up with the VS Code extension host.
   */
  dispose(): void;
}
export interface MessageTransports {
  reader: MessageReader;
  writer: MessageWriter;
}
export declare namespace MessageTransports {
  function is(value: any): value is MessageTransports;
}
export declare abstract class BaseLanguageClient {
  constructor(id: string, name: string, clientOptions: LanguageClientOptions);
  readonly initializeResult: InitializeResult | undefined;
  sendRequest<R, E, RO>(type: RequestType0<R, E, RO>, token?: CancellationToken): Thenable<R>;
  sendRequest<P, R, E, RO>(type: RequestType<P, R, E, RO>, params: P, token?: CancellationToken): Thenable<R>;
  sendRequest<R>(method: string, token?: CancellationToken): Thenable<R>;
  sendRequest<R>(method: string, param: any, token?: CancellationToken): Thenable<R>;
  onRequest<R, E, RO>(type: RequestType0<R, E, RO>, handler: RequestHandler0<R, E>): void;
  onRequest<P, R, E, RO>(type: RequestType<P, R, E, RO>, handler: RequestHandler<P, R, E>): void;
  onRequest<R, E>(method: string, handler: GenericRequestHandler<R, E>): void;
  sendNotification<RO>(type: NotificationType0<RO>): void;
  sendNotification<P, RO>(type: NotificationType<P, RO>, params?: P): void;
  sendNotification(method: string): void;
  sendNotification(method: string, params: any): void;
  onNotification<RO>(type: NotificationType0<RO>, handler: NotificationHandler0): void;
  onNotification<P, RO>(type: NotificationType<P, RO>, handler: NotificationHandler<P>): void;
  onNotification(method: string, handler: GenericNotificationHandler): void;
  readonly clientOptions: LanguageClientOptions;
  readonly protocol2CodeConverter: p2c.Converter;
  readonly code2ProtocolConverter: c2p.Converter;
  readonly onTelemetry: Event<any>;
  readonly onDidChangeState: Event<StateChangeEvent>;
  readonly outputChannel: OutputChannel;
  readonly diagnostics: DiagnosticCollection | undefined;
  createDefaultErrorHandler(): ErrorHandler;
  trace: Trace;
  info(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  error(message: string, data?: any): void;
  needsStart(): boolean;
  needsStop(): boolean;
  onReady(): Promise<void>;
  start(): Disposable;
  stop(): Thenable<void>;









  registerFeatures(features: (StaticFeature | DynamicFeature<any>)[]): void;
  registerFeature(feature: StaticFeature | DynamicFeature<any>): void;







  logFailedRequest(type: RPCMessageType, error: any): void;
}
