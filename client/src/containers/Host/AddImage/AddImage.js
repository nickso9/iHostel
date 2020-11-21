import React, { useState } from 'react'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form' 



const AddImage = () => {

    const [images, setImages] = useState([
        'https://placeimg.com/400/280/arch',
        'https://placeimg.com/400/280/tech',
        'https://placeimg.com/400/280/people'
    ])
    const [loading, setLoading] = useState(false)

    const uploadImage = async image => {
        const files = image.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'wh7prbnn')
        setLoading(true)
        console.log(data)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dv1oijudu/image/upload',
            {
            method: 'POST',
            body: data  
            }
        )

        const file = await res.json()
        console.log(file)
        setImages(file.secure_url)
        setLoading(false)
    }



        return (
            <>
                <hr />
                <div className='host-images-container mb-2'>
                    
                        {images.map((images, index) => {
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
                        <div className="mt-3 border justify-content-around d-inline-flex">
                            {/* <Form.File className="d-inline-flex" type='file' onChange={uploadImage} >
                            </Form.File> */}
                                
                                <input type='file' name='file' id="image" onChange={uploadImage}/> 
                           


                        </div>
                </div>  
            </>
        )
}

export default AddImage