import React, { useState, useEffect } from 'react'

import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
import { Link, useHistory} from "react-router-dom";
import jwtDecode from 'jwt-decode';

const DirectChatPage = () => {
	const [username, setUsername] = useState('')
	const history = useHistory();
	const [chatUser, setChatUser] = useState([]);
	const [user, setUser] = useState([]);
	const token = localStorage.getItem('token');
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// function getOrCreateUser() {
		// event.preventDefault()
	useEffect(() => {
		if (token) {
            const u = jwtDecode(token)
            setUser(u)
            setIsLoggedIn(true);
            if (!u) {
                localStorage.removeItem('token')
                history.replace('/login')
            } else {
				const response = fetch("https://api.chatengine.io/users/", {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'PRIVATE-KEY': '2bcabace-e563-4522-8e54-f903d5c88bda',
					},
					body: JSON.stringify({
						"username": u.email,
						"secret": u.password
					}),
				})
                .then((response) => response.json())
                .then((responseJson) => {
                    setChatUser(responseJson);
                });
			}
		}

	// }
	}, [token]);
	console.log(user)
	console.log(chatUser)

	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}

	function renderChatForm(creds) {
		return (
			<div>
				<input 
					placeholder='Username' 
					value={user.email} 
					onChange={(e) => setUsername(e.target.value)} 
				/>
				<button onClick={() => createDirectChat(creds)}>
					Create
				</button>
			</div>
		)
	}

	let u = chatUser.username;
	let s = chatUser.secret;
	console.log(user.email)
	return (
		<ChatEngine
			height='100vh'
			userName={user.email}
			userSecret={user.password}
			projectID='f1fc6040-cc24-4b82-be07-fe24f8b8888c'
			renderNewChatForm={(creds) => renderChatForm(creds)}
		/>
	)
}

export default DirectChatPage;