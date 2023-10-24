var toDoArray = [
    {
        id: 1,
        task: "Buy groceries",
        done: false
    },
    {
        id: 2,
        task: "Finish homework",
        done: false
    },
    {
        id: 3,
        task: "Go to the gym",
        done: true
    },
    {
        id: 4,
        task: "Read a book",
        done: false
    },
    {
        id: 5,
        task: "Call a friend",
        done: true
    }
];

exports.handler = async (event, context) => {

    const {method, path} = event.requestContext.http;
    

    if (method === 'GET' && path === '/to_do') {
        return {
            statusCode: 200,
            // Is 'Content-type' and 'application/json' pre defined, I wonder?
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({toDoArray})
        }
    } else if (method === 'POST' && path === '/to_do'){

        var newToDo = JSON.parse(event.body);
       
        const id = context.awsRequestId;
       
        newToDo.id = id;
        toDoArray.push(newToDo);

        return {
            statusCode: 200,
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                success: true,
                new_to_do: newToDo,
                }),
        }
    } else if (method === 'DELETE' && path === '/to_do') {

        const removeID = JSON.parse(event.body).id;

        //This works 'cause splice returns the deleted object
        const removedToDo = toDoArray.splice(toDoArray.findIndex(item => item.id === removeID), 1);

        return {
            statusCode: 200,
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                success: true,
                removed: removedToDo,
                }),
        }
    }

    else if (method === 'PUT' && path === '/to_do') {

        const updateDoneID = JSON.parse(event.body).id;

        const itemIndex = toDoArray.findIndex(obj => {
            return obj.id === updateDoneID
          })

        toDoArray[itemIndex].done = !toDoArray[itemIndex].done;

        return {
            statusCode: 200,
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                success: true,
                done: toDoArray[itemIndex].done,
                }),
        }
    }
    return 'Ooops';
}