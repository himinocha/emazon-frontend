import React, {useState, useEffect} from 'react';
import './ItemUpload.css';
import { Link, useHistory} from "react-router-dom";
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ImageUploading from 'react-images-uploading';
import Select from 'react-select';
import jwtDecode from 'jwt-decode';
import LogoutIcon from '@mui/icons-material/Logout';

function ItemUpload(){
    const [images, setImages] = React.useState([]);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [title, setTitle] = useState('');
    const [rating,setRating] = useState('');
    const maxNumber = 1;
    const history = useHistory();
    const [user, setUser] = useState([]);
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState('')

    
    const onChange = async (imageList, addUpdateIndex) => {
    // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);

        const files = imageList[0].file;
        const data = new FormData();

        data.append('file', files);
        data.append('upload_preset', 'emazon_upload')
        setLoading(true)

        const res = await fetch("https://api.cloudinary.com/v1_1/daujwutxo/image/upload", {
            method: 'POST',
            body: data
        })

        const file = await res.json();
        
        setImage(file.secure_url)

    };

    const options = [
        { value: 3, label: 'Used' },
        { value: 4, label: 'Like New' },
        { value: 5, label: 'Brand New' }
        ]

    useEffect(() => {
        if (token) {
            const u = jwtDecode(token)
            setUser(u)
            if (!u) {
                localStorage.removeItem('token')
                history.replace('/login')
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        history.replace('/Home')
    }

    async function uploadProduct(event) {
		event.preventDefault()

		const response = await fetch('https://emazon-backend.herokuapp.com/api/products/upload', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
                userEmail: user.email,
				name: title,
				rating,
				price,
                image
			}),
		})
		const data = await response.json()

        console.log(data);

		if (data.status === 'ok') {
			console.log('ok')
            history.replace('/Profile')
		}

	}


    return(
        <div className='profile'>
            <div className='profile_header'>
                <div className='profile_image'>
                    <img 
                    src='https://github.com/yikevding/emazon/blob/main/emory.jpeg?raw=true'
                    width={200}/>
                </div>

                <div className='profile_info'>
                    <h3 className='user_name'>
                        {user.firstName} {user.lastName}
                    </h3>

                    <div className='occupation'>
                        {user.occupation}
                    </div>

                    <Link to='/Home'>
                        <button className='signout_button' onClickCapture={logout}>
                            <LogoutIcon/> Sign out
                        </button>
                    </Link>

                    <Link to='/EditProfile'>
                        <button className='edit_profile_button'>
                            <EditIcon/> Edit Profile
                        </button>
                    </Link>

                </div>
            </div>

            <div className='profile_main_body'>
                <div className='left_side'>
                    <div className='info_side'>
                        <p className='phone_number'>
                            <PhoneEnabledIcon/> {user.phoneNumber}
                        </p>

                        <p className='email'>
                            <EmailIcon/> {user.email}
                        </p>
                        
                        <div className='user_bio'>
                            <p className='bio'>
                                {user.description}
                            </p>
                        </div>

                        <div className='profile_buttons'>
                            <button className='chat_button'>
                                <ChatIcon/> Chat
                            </button>

                                <Link to ="/ItemUpload">
                                    <button className='sell_button'>
                                            <AddIcon/> Sell
                                    </button>
                                </Link>
                        </div>
                    </div>
                </div>

                <div className='right_side'>
                    <div className='image_side'>
                        <h2>Sell Your Items!</h2>    
                        <div class = "header-bottom"></div>

                        <h5>Title</h5>
                            <input type='text' 
                            name = "title" 
                            className='inputBox'
                            value={title} 
                            placeholder='Enter the name of your item...'
                            onChange={e => setTitle(e.target.value)} />

                        <h5>Price</h5>
                            <input type='number' 
                            className='inputBox'
                            name = "price" 
                            value={price} 
                            placeholder='Enter your ideal price of this item...'
                            onChange={e =>setPrice(e.target.value)} />

                        <h5>Condition</h5>
                        <Select
                            name="colors"
                            options={options}
                            className="selectBox"
                            classNamePrefix="select"
                            onChange={e =>setRating(e.value)}
                        />                        

                        <h5>Description</h5>
                        <input type='text' 
                        name = "Description" 
                        className='description'
                        value={description} 
                        placeholder='Enter a description here...'
                        onChange={e =>setDescription(e.target.value)} />

                        <div className="App">
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={onChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                            >
                                {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                                }) => (
                                // write your building UI
                                <div className="upload__image-wrapper">
                                    <button
                                    style={isDragging ? { color: 'blue' } : undefined}
                                    className='button-30'
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    >
                                    Click or Drop here
                                    </button>
                                    &nbsp;
                                    <button className='button-30' onClick={onImageRemoveAll}>Remove all images</button>
                                    &nbsp;
                                    <button className ='sell_button2' onClick={uploadProduct}>Post</button>
                                    {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image['data_url']} alt="" width="300" />
                                        <div className="image-item__btn-wrapper">
                                        <button className ='button-81' onClick={() => onImageUpdate(index)}>Update</button>
                                        <button className ='button-81' onClick={() => onImageRemove(index)}>Remove</button>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                )}
                            </ImageUploading>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )


}

export default ItemUpload