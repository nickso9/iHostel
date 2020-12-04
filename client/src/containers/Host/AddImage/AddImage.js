import React, { useContext, useEffect, useState } from 'react';
import HostContext from '../../../contexts/HostContext'
import { v4 } from 'uuid';

const AddImage = () => {
    const { host, setHost } = useContext(HostContext)
    
    const fixImage = (newImageArr) => {
        setHost(prevState => ({
            ...prevState,
            images: newImageArr
        })) 
        
    }

    // const removeImage = (image) => {
    //     setImageState((oldState) => oldState.filter((item, index) => item !== image));
    //   };

    // const [ imageState, setImageState] = useState([])
    // useEffect(() => {
    //     setImageState(host.images)     
    // }, [])

 
    const uploadImage = async image => {
        const files = image.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'wh7prbnn')
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dv1oijudu/image/upload',
            {
            method: 'POST',
            body: data
            })

        const file = await res.json()
        const newImageArray = [...host.images]
        newImageArray.push(file.secure_url)
        setHost(prevState => ({
            ...prevState,
            images: newImageArray
        })) 

        
        document.getElementById("image").value = ''
        
    }
    
    let imageCheck = true;

    if (host.images.length > 1) {
        imageCheck = false
    }

        return (
            <>
                <div className='host-images-container mb-2'>
                    
                        {host.images.map((images, index) => {      
                            if (index === 0) {
                          
                                return (
                                  <div key={v4()}>
                                <div className='main-image-container d-block' id='main-image-src'><img id={v4()} alt="" src={images} /></div>
                                    <div className="d-block mt-2">
                                    <span  style={{fontSize: '11px'}}> click thumbnails to select</span>
                                    <button 
                                        disabled={imageCheck}
                                        className="border border-secondary px-3 float-right"
                                        onClick={() => {
                                            console.log('hihi')
                                            let imageToRemove = String(document.getElementById('main-image-src').firstElementChild.getAttribute('src'))
                                            let newArrayImgs = host.images.filter(item => item !== imageToRemove);
                                            // let idToRemove = Number(document.getElementById('main-image-src').firstElementChild.getAttribute('id'))
                                            fixImage(newArrayImgs) 
                                          
                                        }}
                                    >Remove </button>
                                    </div>
                                    </div>
                                    
                                )
                            } else {

                                let smallImageContainer = v4()
                        
                                return <div className='small-image-container m-2' key={v4()} id={smallImageContainer}>
                                    
                                    <img 
                                        id={v4()}
                                        alt=""
                                        src={images} 
                                        onClick={(e) => {
                                            let mainImage = {
                                                src: document.getElementById('main-image-src').firstElementChild.getAttribute('src'),
                                                id: document.getElementById('main-image-src').firstElementChild.getAttribute('id'),
                                            }
                                            
                                            document.getElementById('main-image-src').firstElementChild.setAttribute('src', `${e.target.src}`)
                                            document.getElementById('main-image-src').firstElementChild.setAttribute('id', `${e.target.id}`)

                                            
                                            document.getElementById(smallImageContainer).lastElementChild.setAttribute('id', mainImage.id)
                                            document.getElementById(smallImageContainer).lastElementChild.setAttribute('src', mainImage.src)
                                            
                                            mainImage = {}              
                                        }}/></div>
                            }
                        })}
                        <br />
                        <div className="mt-1 border justify-content-around d-inline-flex">                  
                                <input className="" type='file' name='file' id="image" onChange={uploadImage} accept="image/*" />
                        </div>
                </div>  
            </>
        )
}

export default AddImage