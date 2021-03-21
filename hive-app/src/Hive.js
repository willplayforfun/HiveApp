import React from "react";
import "./Hive.css"


// componentWillMount 
//	+ is executed before rendering, on both the server and the client side.

// componentDidMount 
//	+ is executed after the first render only on the client side. This is where AJAX requests and DOM or state updates should occur. This method is also used for integration with other JavaScript frameworks and any functions with delayed execution such as setTimeout or setInterval. 

// componentWillReceiveProps 
//	+ is invoked as soon as the props are updated before another render is called. We triggered it from setNewNumber when we updated the state.

// shouldComponentUpdate 
//	+ should return true or false value. This will determine if the component will be updated or not. This is set to true by default. If you are sure that the component doesn't need to render after state or props are updated, you can return false value.

// componentWillUpdate 
//	+ is called just before rendering.

// componentDidUpdate 
//	+ is called just after rendering.

// componentWillUnmount 
//	+ is called after the component is unmounted from the dom.


//https://css-tricks.com/using-requestanimationframe-with-react-hooks/
//TLDR:
// + Pass an empty array as a second parameter for useEffect to avoid it running more than once
// + pass a function to your state’s setter function to make sure you always have the correct state. 
// + Also, use useRef for storing things like the timestamp and the request’s ID.


//https://philna.sh/blog/2018/09/27/techniques-for-animating-on-the-canvas-in-react/


// thanks to https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/18053642#18053642
function getCursorPosition(canvas, event) 
{
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	return {x: x, y: y}
}


// this component draws onto a canvas based on the props
class HiveBoard extends React.Component 
{
	constructor(props) 
	{
		super(props);
		
		this.canvasRef = React.createRef();
	}
	
	getCanvas() { return this.canvasRef.current; }
	getContext() { return this.canvasRef.current.getContext('2d'); }
	
	componentDidMount()
	{
		const canvas = this.getCanvas();
		const ctx = this.getContext();
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
	
	paint()
	{
		const canvas = this.getCanvas();
		const ctx = this.getContext();
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	render()
	{
		return (
			<div>
				<canvas 
					ref={this.canvasRef}
					width={this.props.width}
					height={this.props.height}
					onClick={e => {
						//alert(e.clientX + ", " + e.clientY);
						const ctx = this.getContext();
						ctx.fillStyle = 'deepskyblue';
						const clickPos = getCursorPosition(this.getCanvas(), e);
						ctx.fillRect(clickPos.x, clickPos.y, 10, 10);
					}}						
				/>
			</div>
		);
	}
}


class HiveGame extends React.Component 
{
	constructor(props)
	{
		super(props);
		
		this.state = {
			
		};
	}
	
	// here we will register the tick
	componentDidMount()
	{
		this.tickTimerID = setInterval(
			() => this.tick(),
			1000
		);
	}
	// here we will unregister the tick
	componentWillUnmount()
	{
		clearInterval(this.tickTimerID);
	}

	tick() 
	{
		// const rotation = this.state.rotation + 0.04;
		// this.setState({ rotation });
		// requestAnimationFrame(this.tick);
	}

	
	render() 
	{
		return (
			<div className="game">
				<div className="game-board">
					<HiveBoard 
						width={window.innerWidth * 0.75}
						height={window.innerHeight * 0.75}
					/>
				</div>
				<div className="game-info">
					<div className="status"></div>
				</div>
			</div>
		);
	}
}

export default HiveGame;
