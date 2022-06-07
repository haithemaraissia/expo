

export default  function authHeader(value) {
        

            const user =  JSON.parse(value);

            console.log('inside autHeader , user.token', user.token)
          if (user && user.token) { 
                return { Authorization: 'Bearer ' + user.token };
                } else {
                return {};
                }
           };