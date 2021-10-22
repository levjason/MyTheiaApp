import * as React from 'react';
import { injectable, postConstruct, inject } from '@theia/core/shared/inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';

@injectable()
export class ticExtensionWidget extends ReactWidget {

    static readonly ID = 'ticExtensionWidget:widget';
    static readonly LABEL = 'Tic Tac Toe';

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    @postConstruct()
    protected async init(): Promise<void> {
        this.id = ticExtensionWidget.ID;
        this.title.label = ticExtensionWidget.LABEL;
        this.title.caption = ticExtensionWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-window-maximize'; // example widget icon.
        this.update();
    }


    render(): React.ReactElement {
        return <div id='tic-container'>
            <Game />
        </div>
    }

    protected displayMessage(): void {
        this.messageService.info('Congratulations: Tic Tac Toe Widget Successfully Created!');
    }

}
namespace Square {
    export interface ticProps {
        value: number;
    }
}
class Square<P extends Square.ticProps = Square.ticProps> extends React.Component<P> {
    constructor(props: P) {
        super(props);
        this.state = {
            value: null  
        };
    }

    render() {
        return (
            <button
                className="square"
                onClick={() => this.setState({ value: 'X' })}
            >
                {this.state.value}
            </button>
        );
    }
}
class Board extends React.Component {
    renderSquare(i: number) {
        return <Square value={i} />;

    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

