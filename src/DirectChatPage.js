import React, { useState, useEffect, useMemo } from 'react'

import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
import { Link, useHistory} from "react-router-dom";
import jwtDecode from 'jwt-decode';

const DirectChatPage = () => {
	const history = useHistory();
	const [chatUser, setChatUser] = useState([]);
	const token = localStorage.getItem('token');
	const [username, setUsername] = useState('')
	const [user, setUser] = useState([]);
	
	useMemo(() => {
		if (token) {
			const u = jwtDecode(token)
			setUser(u)
		}
	}, []);

	useEffect(() => {
		const response = fetch("https://api.chatengine.io/users/", {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'PRIVATE-KEY': '2532a3c0-7140-41dc-b687-6d9f41830372',
			},
			body: JSON.stringify({
				"username": user.email,
				"secret": '1q2w3e4r'
			}),
		})
	}, []);

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
					placeholder='User Email'
					onChange={(e) => setUsername(e.target.value)} 
				/>
				<button onClick={() => createDirectChat(creds)}>
					Create
				</button>
			</div>
		)
	}
	
	return (
		<ChatEngine
			height='100vh'
			userName={user.email}
			userSecret={'1q2w3e4r'}
			projectID='64852b59-9105-4c2d-a9a9-ffee383a4b81'
			renderNewChatForm={(creds) => renderChatForm(creds)}
		/>
	)
}
export default DirectChatPage;