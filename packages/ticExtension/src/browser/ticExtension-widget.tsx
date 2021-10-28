import * as React from 'react';
import { injectable, postConstruct } from '@theia/core/shared/inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';


@injectable()
export class ticExtensionWidget extends ReactWidget {

    static readonly ID = 'ticExtensionWidget:widget';
    static readonly LABEL = 'Tic Tac Toe';



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



}
namespace Square {
    export interface ticProps {
        value: any;
        click: any;
    }
    export interface State {
        squares: Array<any>;
        xIsNext: boolean;
    }
}
class Square<P extends Square.ticProps = Square.ticProps> extends React.Component<P> {


    render() {
        return (
            <button
                className="square"
                onClick={this.props.click}
            >
                {this.props.value}
            </button>
        );

    }
}
class Board<P extends Square.ticProps = Square.ticProps> extends React.Component<P, Square.State> {
    constructor(props: P) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };

    }
    renderSquare(i: number) {
        return <Square value={this.state.squares[i]}
            click={() => this.handleClick(i)}
        />;

    }
    handleClick(i: number) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const winner = this.calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
                </div>
            </div>
        );

    }
    calculateWinner(squares: any[]) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board value={undefined} click={undefined} />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

