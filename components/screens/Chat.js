/**
 * A simple SignalR chat client written in React Native
 * https://github.com/jonathanzufi/SignalR-react-native-client
**/

import React, { useEffect,useState } from 'react';
import { SafeAreaView, StyleSheet,Image, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import { GiftedChat } from 'react-native-gifted-chat';


// Defines how we'll render incoming messages in the message log
function MessageItem({ title }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

function buttonEnabled(enabled) {
    return (enabled ? styles.buttonText_enabled : styles.buttonText_disabled);
}

// The public hub to connect to. This is running code from https://github.com/jonathanzufi/SignalRWebServer 
const hub_endpoint = 'https://signalrdemo.com/chatHub';

const Chat = () => {

    const [connection, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState('de');
    const [room, setRoom] = useState('ddd');
    const joinRoom = async (user, room) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl('http://172.20.10.4:44382/chat'
                    //, {
                    //skipNegotiation: true,
                    //transport: HttpTransportType.WebSockets
                    //}
                )
                .configureLogging(LogLevel.Debug)
                .build();
            
            connection.on("ReceiveMessage", (user, message) => {
                setMessages(messages => [...messages, { user, message }]);
            });

            connection.on("UsersInRoom", (users) => {
                //console.log(users)
                setUsers(users);
            });

            connection.onclose(e => {
                setConnection();
                setMessages([]);
                setUsers([]);
            });
            
            await connection.start();
            await connection.invoke("JoinRoom", { user, room });
            setConnection(connection);
            console.log(connection);
            
        } catch (e) {
            console.log(e);
        }
    }
    
    const sendMessage = async (message) => {
        try {
            await connection.invoke("SendMessage", message);
        } catch (e) {
            console.log(e);
        }
    }

    const closeConnection = async () => {
        try {
            await connection.stop();
        } catch (e) {
            console.log(e);
        }
    }
    //useEffect(() => {
    //    joinRoom(user,room)
        
    //}, []);
   
    return (
        //<View style={{ width: '100%', height: '100%',position:'relative', justifyContent: 'center',alignItems:'center' }}>
        //    <Image source={{ uri: 'http://cdn.onlinewebfonts.com/svg/img_568656.png' }} style={{ margin: 10,tintColor:'green', width: 100, height: 100 }}/>
        //    <Text style={{  }}>Vui lòng đăng nhập để tiếp tục</Text>
        //    <TouchableOpacity style={{margin:10, padding: 10, backgroundColor: 'green', borderRadius: 10 }}>
        //        <Text style={{ fontWeight: '700',color:'white' }}>Đăng nhập</Text>
        //    </TouchableOpacity>
        //    <Text style={{fontSize:12}}>Hoặc đăng ký tài khoản mới</Text>
        //    <TouchableOpacity style={{ margin: 10, padding: 10, backgroundColor: 'green', borderRadius: 10 }}>
        //        <Text style={{ fontWeight: '700', color: 'white' }}>Đăng ký</Text>
        //    </TouchableOpacity>
        //</View>
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={() => joinRoom(user, room)
                            }
            //user={{
            //    _id: auth?.currentUser?.email,
            //    name: auth?.currentUser?.displayName,
            //    avatar: auth?.currentUser?.photoURL
            //}}
        />
        //    //<SafeAreaView>
            //    <View>
            //        <View style={styles.sectionContainer}>

            //            <Text style={styles.sectionTitle}>SignalR Demo</Text>
            //            <Text style={styles.connectedto}>{connectionState}</Text>

            //            <TextInput placeholder='User' style={styles.fields}
            //                onChangeText={text => onChangeUserText(text)} value={user}
            //            />

            //            <TextInput placeholder='Message' style={styles.fields}
            //                onChangeText={text => onChangeMessageText(text)} value={message}
            //            />

            //            <View style={{ flex: 1, flexDirection: 'row' }}>

            //                <TouchableOpacity style={styles.button} onPress={() => {
            //                    if (user.length === 0 || message.length === 0)
            //                        return;
            //                    console.log(`Sending ${message} from ${user}`);
            //                    conn.invoke("SendMessage", `${user}`, `${message}`).catch(function (err) {
            //                        console.log(`Error sending ${message} from ${user}: ${err.message}`);
            //                    });
            //                    onChangeMessageText('');
            //                }}>
            //                    <Text style={buttonEnabled(isConnected)}>Send</Text>
            //                </TouchableOpacity>


            //                <TouchableOpacity style={styles.button} onPress={() => {
            //                    onChangeUserText('');
            //                    onChangeMessageText('');
            //                    setMessageLog([]);
            //                }}>
            //                    <Text style={buttonEnabled(isConnected)}>Clear</Text>
            //                </TouchableOpacity>


            //                <TouchableOpacity style={styles.button} onPress={() => {
            //                    conn
            //                        .start()
            //                        .then(() => {
            //                            console.log(`Connected to the hub endpoint: ${hub_endpoint}`)
            //                            setConnectedStateText('Connected to ' + hub_endpoint);
            //                            setConnected(true);
            //                        })
            //                        .catch(err => console.log(`Error starting the connection: ${err.toString()}`));

            //                }}>
            //                    <Text style={buttonEnabled(!isConnected)}>Reconnect</Text>
            //                </TouchableOpacity>

            //            </View>

            //            <FlatList
            //                style={styles.messageList}
            //                data={messageLog}
            //                renderItem={({ item }) => <MessageItem title={'\u2B24 ' + item.user + ' says: ' + item.message} />}
            //                keyExtractor={item => item.id}
            //            />

            //        </View>
            //    </View>
            //</SafeAreaView>
        
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32, paddingHorizontal: 24, backgroundColor: 'white'
    },
    connectedto: {
        fontSize: 10, fontStyle: 'italic'
    },
    fields: {
        marginTop: 20, paddingLeft: 10, fontSize: 15, height: 40, borderWidth: 1
    },
    sectionTitle: {
        fontSize: 24, fontWeight: '600', color: 'black',
    },
    button: {
        borderWidth: 2, borderColor: "#89AAFF", width: 109, height: 50, alignItems: 'center',
        justifyContent: 'center', marginTop: 20, marginRight: 20
    },
    buttonText_enabled: {
        fontSize: 20, color: 'black'
    },
    buttonText_disabled: {
        fontSize: 20, color: '#dfe1e6'
    },
    messagelogitem: {
        backgroundColor: '#f9c2ff', padding: 10, marginVertical: 4, marginHorizontal: 4,
    },
    messageList: {
        marginTop: 90
    }
});

export default Chat;