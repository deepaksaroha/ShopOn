const paymentHandlers = {
    onSuccess: (options) => {
        fetch(`/api/orders/${options.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(options),
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.ok){
                window.location = `/orders/${options.id}`;
            }
        })
        .catch(()=>{
            console.log('something went wrong');
        });
    },
    onDismiss: ()=>{},
};

module.exports = paymentHandlers;