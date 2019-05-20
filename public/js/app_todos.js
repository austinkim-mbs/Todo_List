
class Dashboard extends React.Component{
	state = {
		count: 0,
		todos: [],
	};


	componentDidMount(){
		this.setState({

			count:3,

			todos: 
		[
			{
				id:1,
				title: 'Eat Dinner',
				checked: false,
				time: 60,
			},
			{
				id:2,
				title: 'Eat BreakFast',
				checked: false,
				time: 30,
			},
			{
				id:3,
				title: 'Do Laundry'	,
				checked: true,
				time: 130,
			},
		],
		});
	}
	
	handleChecked = (id) => {
		this.setState({
			todos: this.state.todos.map((todo) =>{
				if(id === todo.id){
					return Object.assign({}, todo, {
			            checked: !todo.checked,
			          });
				}else return todo;
				
		}),
		});
		
	};
	addNewTask = (info) => {

		
		info.id = this.state.count+1;
		info.checked = false;
		this.setState({
			todos: this.state.todos.concat(info),
			count: this.state.count+1,
		});
	};

	handleTrashClick = (id) => {
		this.setState({
			todos: this.state.todos.filter((todo) => todo.id !== id) });		
	};	


	render(){

		const sortedTodos = this.state.todos.sort((a, b) => {
			if( a.checked !== b.checked){
				if(a.checked){
					return 1;
				}
				else return -1;
			}
			else{
				return a.time - b.time;
			}

		});
		const toDoList = sortedTodos.map( (todo) => (
			<Todo
				key = {todo.id}
				id = {todo.id}
				title = {todo.title}
				time = {todo.time}
				onTrashClick = {this.handleTrashClick}
				onChecked = {this.handleChecked}
				checked = {todo.checked}
			/>
		));
		return(
			<div className='ui unstackable items'>
				{toDoList}
				<ToggleForm
					submitNewTask = {this.addNewTask}
				/>
			</div>
			);
		
	};
		
}


class Todo extends React.Component{

	handleTrashClick = () => {
		this.props.onTrashClick(this.props.id);
	};

	handleChecked = () =>{
		this.props.onChecked(this.props.id);
	};
	render(){
		return(
			<div className = 'ui segment'>
			<div className = 'ui grid'>
				<div className='center aligned two column row'>

				    <div className='left aligned right floated column'>
				      <div className='item'>
						<div className='ui checkbox'>
						<input type='checkbox' checked = {this.props.checked}  onChange = {this.handleChecked} />
						<label>{this.props.title}</label>
						
						</div>
						      </div>
				    </div>
				    <div className='right aligned left floated column'>
				      <div className='extra content'>
				      	<div>
						{this.props.time} minutes
						</div>
						
						<span className='right floated trash icon' onClick={this.handleTrashClick}>
              				<i className='trash icon' />
            			</span>
				      </div>
				      
				    </div>

				</div>
			</div>
			</div>

		);
	};
}

class ToggleForm extends React.Component{

	state = {
		isOpen: false,
	}
	newTodo = () =>{

	}
	onToggle = () =>{
		this.setState({isOpen: !this.state.isOpen});
	};

	handleSubmit = (info) =>{
		this.props.submitNewTask(info);
	};


	render(){
			if(!this.state.isOpen){
				return(

				<div className = 'ui basic content center aligned segment'>
				<span className = ' right floated plus square outline' onClick={this.onToggle}>
					<i className='large plus square outline icon'/>
				</span>
			</div>
			);
			}else{
				return(
					<div>
						<AddNew
							onFormClose = {this.onToggle}
							submitNewTask = {this.handleSubmit}
						/>
					</div>
				);
			}
			
		
	}
}

class AddNew extends React.Component{

	state = {
		title:'',
		time:'',
	};
	
	

	handleTitleChange = (e) =>{
		this.setState({
			title:e.target.value
		});
	};
	handleTimeChange = (e) =>{
		this.setState({
			time: e.target.value
		});
	}

	handleSubmit = () =>{
		this.props.submitNewTask(this.state);
		this.props.onFormClose();

	};

	render(){
		return(
		<div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Task</label>
              <input
                type='text'
                onChange={this.handleTitleChange}
              />
            </div>
            <div className='field'>
              <label>Estimated Completion Time (Minutes)</label>
              <input
                type='text'
                onChange={this.handleTimeChange}
              />
            </div>
            <div className='ui two bottom attached buttons'>
              <button
                className='ui basic blue button'
                onClick={this.handleSubmit}
              >
                Submit
              </button>
              <button
                className='ui basic red button'
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
		);
	}
}

ReactDOM.render(<Dashboard/>, document.getElementById('content'));