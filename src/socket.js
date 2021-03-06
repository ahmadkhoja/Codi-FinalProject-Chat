import SocketIo from 'socket.io'
import translate from 'google-translate-api'

export default function(server){
    let userId = 0
    const io = SocketIo(server);

    const users = [
        {language:'en',name:'ahmad'},
        {language:'fr',name:'jad'},
        {language:'es',name:'ali'},
        {language:'de',name:'bob'},
        {language:'fr',name:'amr'},
        {language:'tr',name:'omar'},
        {language:'fr',name:'jospeh'},
        {language:'fr',name:'joelle'},
        {language:'fr',name:'hortense'},
        {language:'fr',name:'anas'},
    ]

    const languages = [];
    /*
    const languages = []
    const groups = {}
    users.forEach((user)=>{
        const lg = user.language
        if(typeof groups[lg] === 'undefined'){
            languages.push(lg)
            groups[lg] = []
        }
        groups[lg].push(user)
    })
    */

    io.on('connection', (socket) => {
        
        console.log('a user connected');
        
        const currentUserId = userId++
        const lang = users[currentUserId].language
        
        socket.join(lang)

        if(languages.indexOf(lang)<0){
            languages.push(lang)
        }

        const room = io.sockets.adapter.rooms[lang];

        socket.emit('giving you the user a name',users[currentUserId].name,users[currentUserId].language)

        // socket.on('signup',(name,password,language) =>{
        //     users.push({name,language})
        // })


        // socket.on('authenticate',(user,password)=>{
        //     if(){
        //         socket.emit('giving you the user a name',users[currentUserId].name,users[currentUserId].language)
        //         socket.emit('giving you the user id',currentUserId)
        //     }
        // })
        
        console.log(lang, room.length)

        // socket.emit('giving the user a name',)
        socket.on('disconnect', function(){
            if( room.length <= 0 ){
                const index = languages.indexOf(lang);
                languages.splice(index,1); 
            }
            console.log('user disconnected',languages);
        });

        socket.on('message from one user to the server', (text,user_lang) => {
            languages.forEach(lg => {
                if(lg === user_lang){
                    io.to(lg)
                        .emit('server sends a message to everyone',currentUserId,text)   
                }else{
                    translate(text, {from:user_lang,to:lg}).then(res => {
                        // console.log('selected user: ',selected_user);
                        const translated_message = res.text;
                        //=> I speak English 
                        io.to(lg)
                            .emit('server sends a message to everyone',currentUserId,translated_message)
                        console.log(res.from.language.iso);
                        //=> nl 
                      }).catch(err => {
                        console.error(err);
                      });
                }
            })    
            // io.emit('server sends a message to everyone',currentUserId,text)
        })

    });
}