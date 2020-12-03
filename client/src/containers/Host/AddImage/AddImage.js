import React, { useContext } from 'react';
import HostContext from '../../../contexts/HostContext'

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
                <div className='host-images-container mb-2'>
                    
                        {host.images.map((images, index) => {
                            if (index === 0) {
                                return (
                                  <div key={index}>
                                <div className='main-image-container d-block' id='main-image-src'><img id={index} alt="" src={images} /></div>
                                    <div className="d-block mt-2">
                                    <span  style={{fontSize: '11px'}}> click thumbnails to select</span>
                                    <button 
                                        className="border border-secondary px-3 float-right"
                                        onClick={() => {
                                            setHost(prevState => ({
                                                ...prevState,
                                                images: [host.images.pop()]
                                            })) 
                                        
                                        }}
                                    >Remove </button>
                                    </div>
                                    </div>
                                    
                                )
                            } else {
                                return <div className='small-image-container m-2' key={index} id="small-image-container">
                                    
                                    <img 
                                        id={index}
                                        alt=""
                                        src={images} 
                                        onClick={(e) => {
                                            console.log(e.target)
                                            const mainImage = {
                                                src: document.getElementById('main-image-src').firstElementChild.getAttribute('src'),
                                                id: document.getElementById('main-image-src').firstElementChild.getAttribute('id'),
                                            }
                                            
                                            document.getElementById('main-image-src').firstElementChild.setAttribute('src', `${e.target.src}`)
                                            document.getElementById('main-image-src').firstElementChild.setAttribute('id', `${e.target.id}`)

                                            
                                            document.getElementById(`small-image-container`).firstElementChild.setAttribute('id', mainImage.id)
                                            document.getElementById(`small-image-container`).firstElementChild.setAttribute('src', mainImage.src)

                                                                
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