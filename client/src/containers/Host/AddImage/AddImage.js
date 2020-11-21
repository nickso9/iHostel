import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form' 

const images = [
    'https://placeimg.com/400/280/arch',
    'https://placeimg.com/400/280/tech',
    'https://placeimg.com/400/280/people'
]

const AddImage = () => {

        return (
            
                <div className='host-images-container mb-5'>
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
                                            // console.log(mainImage)
                                            document.getElementById('main-image-src').setAttribute('src', `${e.target.src}`)
                                            document.getElementById('main-image-src').setAttribute('alt', `${e.target.alt}`)

                                            document.getElementById(`${e.target.id}`).setAttribute('src', mainImage.src)
                                            document.getElementById(`${e.target.id}`).setAttribute('alt', mainImage.art)
                                                                
                                        }}/></div>
                            }
                        })}
                        <div className="mt-3 border justify-content-around d-inline-flex">
                            <Form.File id="formcheck-api-regular" className="d-inline-flex">
                            <Form.File.Input />
                            <Button className="btn btn-sm btn-dark pr-3 pl-3">Upload</Button>
                            </Form.File>
                        </div>
                </div>  
        )
}

export default AddImage