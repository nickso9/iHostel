import React, { useContext } from 'react';
import { HostContext } from '../../../contexts/HostContext'

const AddImage = () => {
  
    const { host, setHost } = useContext(HostContext)

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
        } 

    ))
        document.getElementById("image").value = ''
        
    }

        return (
            <>
                <hr />
                <div className='host-images-container mb-2'>
                    
                        {host.images.map((images, index) => {
                            if (index === 0) {
                                return <div className='main-image-container' key={index}><img id='main-image-src' alt={images} src={images} /></div>
                            } else {
                                return <div className='small-image-container m-2' key={index} >
                                    <img 
                                        id={`image` + index}
                                        alt={images} 
                                        src={images} 
                                        onClick={(e) => {
                                            
                                            const mainImage = {
                                                alt: document.getElementById('main-image-src').getAttribute('alt'),
                                                src: document.getElementById('main-image-src').getAttribute('src'),
                                            }
                                            document.getElementById('main-image-src').setAttribute('src', `${e.target.src}`)
                                            document.getElementById('main-image-src').setAttribute('alt', `${e.target.alt}`)

                                            document.getElementById(`${e.target.id}`).setAttribute('src', mainImage.src)
                                            document.getElementById(`${e.target.id}`).setAttribute('alt', mainImage.art)
                                                                
                                        }}/></div>
                            }
                        })}
                        <div className="mt-5 border justify-content-around d-inline-flex">                  
                                <input className="" type='file' name='file' id="image" onChange={uploadImage} accept="image/*" />
                        </div>
                </div>  
            </>
        )
}

export default AddImage