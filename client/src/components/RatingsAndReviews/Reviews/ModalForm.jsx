import React, { useState, useEffect } from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const ModalForm = ({closeModal, productId}) => {
    const [characterCount, setCharacterCount] = useState(0);
    const [rateValue, rateInputProps] = userateBtns("option")
    const [recValue, recInputProps] = useRecClick("true")
    
    const [size, setSize] = useState(null)
    const [width, setWidth] = useState(null)
    const [comfort, setComfort] = useState(null)
    const [quality, setQuality] = useState(null)
    const [length, setLength] = useState(null)
    const [fit, setFit] = useState(null)

    const [summary, setSummary] = useState("")
    const [review, setReview] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState(null)
    const [selectedImages] = useState([])

    const [product, getProduct] = useState([])

    useEffect(() => {
        axios.get(`/products/${productId}`)
            .then(res => getProduct(res.data))
            .catch(err => console.error('Cannot get current product', err))
    }, [productId])

    const min = 50
    const Minimum = () => 
        (min - characterCount > 0) ? <p style={{ fontSize: "15px" }}>Minimum required characters left: {min - characterCount}</p> : <p>Minimum reached</p>

    function userateBtns(name) {
        const [value, setState] = useState(null);
        const handleChange = e => { setState(e.target.value) }
        const inputProps = {
            name, 
            type: "radio",
            onChange: handleChange
        }
        return [value, inputProps]
    }
    
    function useRecClick(name) {
        const [value, setState] = useState(null)
        const handleChange = e => { setState(e.target.value) }
        const inputProps = {
            name, 
            type: "radio",
            onChange: handleChange
        }
        return [value, inputProps]
    }
    
    const handleSelectImage = e => {
        let url = URL.createObjectURL(e.target.files[0])
        if (image) {
            selectedImages.push(image)
        }
        if (selectedImages.length < 5) {
            setImage(url);
        }
    }

    // handleFormSubmit
    const handleFormSubmit = () => {
        let uploadedImages = [image, ...selectedImages]
        const input = {
            product_id: product.id,
            rating: Number(rateValue),
            summary: summary,
            body: review,
            recommend: (recValue === "true"),
            name: name,
            email: email,
            photos: uploadedImages,
            characteristics: {
                "size": size,
                "width": width,
                "comfort": comfort,
                "quality": quality,
                "length": length,
                "fit": fit
            }
        }
        addReview(input)
    }
    
    // TODO: create axios post request to add review
    const addReview = data => {
        return axios.post(`/reviews/${product.id}`, data, {
            header: {
                'Content-type': 'multipart/form-data'
            }
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            console.error('Cannot add review', err)
        })
    }
    
    return (
        <div>
            <Form className="modalContainer" onSubmit={(e) => {
                e.preventDefault()
                closeModal(false)
                handleFormSubmit()
            }}>
                <div className="form-input">
                    <Form.Group>
                        <Form.Label>Overall Rating</Form.Label>
                            <br></br>
                            <Form.Check
                                inline label="Poor" value="1" {...rateInputProps} checked={rateValue === "1"}
                            />
                            <Form.Check
                                inline label="Fair" value="2" {...rateInputProps} checked={rateValue === "2"}
                            />
                            <Form.Check
                                inline label="Average" value="3" {...rateInputProps} checked={rateValue === "3"}
                            />
                            <Form.Check
                                inline label="Good" value="4" {...rateInputProps} checked={rateValue === "4"}
                            />
                            <Form.Check
                                inline label="Great" value="5" {...rateInputProps} checked={rateValue === "5"}
                            />
                    </Form.Group>
                        <br></br>
                    <Form.Group>
                        <Form.Label>Do you recommend this product?</Form.Label>
                            <br></br>
                            <Form.Check
                                inline label="Yes" {...recInputProps} checked={recValue === "true"} value="true"
                            />
                            <Form.Check
                                inline label="No" {...recInputProps} checked={recValue === "false"} value="false"
                            />
                    </Form.Group>
                        <br></br>

                    <Form.Group>
                        <Form.Label>Size</Form.Label>
                        <br></br>
                        <Form.Check inline label="A size too small" value="1" type="radio" checked={size === "1"} onChange={(e) => setSize(e.target.value)}/>
                        <Form.Check inline label="1/2 size too small" value="2" type="radio" checked={size === "2"} onChange={(e) => setSize(e.target.value)}/>
                        <Form.Check inline label="Perfect" value="3" type="radio" checked={size === "3"} onChange={(e) => setSize(e.target.value)}/>
                        <Form.Check inline label="1/2 size too big" value="4" type="radio" checked={size === "4"} onChange={(e) => setSize(e.target.value)}/>
                        <Form.Check inline label="A size too big" value="5" type="radio" checked={size === "5"} onChange={(e) => setSize(e.target.value)}/>
                    </Form.Group>
                        <br></br>
                    <Form.Group>
                        <Form.Label>Width</Form.Label>
                        <br></br>
                        <Form.Check inline label="Too narrow" value="1" type="radio" checked={width === "1"} onChange={(e) => setWidth(e.target.value)}/>
                        <Form.Check inline label="Slightly narrow" value="2" type="radio" checked={width === "2"} onChange={(e) => setWidth(e.target.value)}/>
                        <Form.Check inline label="Perfect" value="3" type="radio" checked={width === "3"} onChange={(e) => setWidth(e.target.value)}/>
                        <Form.Check inline label="Slightly wide" value="4" type="radio" checked={width === "4"} onChange={(e) => setWidth(e.target.value)}/>
                        <Form.Check inline label="Too wide" value="5" type="radio" checked={width === "5"} onChange={(e) => setWidth(e.target.value)}/>
                    </Form.Group>
                        <br></br>
                    <Form.Group>
                        <Form.Label>Comfort</Form.Label>
                        <br></br>
                        <Form.Check inline label="Uncomfortable" value="1" type="radio" checked={comfort === "1"} onChange={(e) => setComfort(e.target.value)}/>
                        <Form.Check inline label="Slightly uncomfortable" value="2" type="radio" checked={comfort === "2"} onChange={(e) => setComfort(e.target.value)}/>
                        <Form.Check inline label="Ok" value="3" type="radio" checked={comfort === "3"} onChange={(e) => setComfort(e.target.value)}/>
                        <Form.Check inline label="Comfortable" value="4" type="radio" checked={comfort === "4"} onChange={(e) => setComfort(e.target.value)}/>
                        <Form.Check inline label="Perfect" value="5" type="radio" checked={comfort === "5"} onChange={(e) => setComfort(e.target.value)}/>
                    </Form.Group>
                        <br></br>
                    <Form.Group>
                        <Form.Label>Quality</Form.Label>
                        <br></br>
                        <Form.Check inline label="Poor" value="1" type="radio" checked={quality === "1"} onChange={(e) => setQuality(e.target.value)}/>
                        <Form.Check inline label="Below average" value="2" type="radio" checked={quality === "2"} onChange={(e) => setQuality(e.target.value)}/>
                        <Form.Check inline label="What I expected" value="3" type="radio" checked={quality === "3"} onChange={(e) => setQuality(e.target.value)}/>
                        <Form.Check inline label="Pretty great" value="4" type="radio" checked={quality === "4"} onChange={(e) => setQuality(e.target.value)}/>
                        <Form.Check inline label="Perfect" value="5" type="radio" checked={quality === "5"} onChange={(e) => setQuality(e.target.value)}/>
                    </Form.Group>
                        <br></br>
                    <Form.Group>
                        <Form.Label>Length</Form.Label>
                        <br></br>
                        <Form.Check inline label="Runs short" value="1" type="radio" checked={length === "1"} onChange={(e) => setLength(e.target.value)}/>
                        <Form.Check inline label="Runs slightly short" value="2" type="radio" checked={length === "2"} onChange={(e) => setLength(e.target.value)}/>
                        <Form.Check inline label="Perfect" value="3" type="radio" checked={length === "3"} onChange={(e) => setLength(e.target.value)}/>
                        <Form.Check inline label="Runs slightly long" value="4" type="radio" checked={length === "4"} onChange={(e) => setLength(e.target.value)}/>
                        <Form.Check inline label="Runs long" value="5" type="radio" checked={length === "5"} onChange={(e) => setLength(e.target.value)}/>
                    </Form.Group>
                        <br></br>
                    <Form.Group>
                        <Form.Label>Fit</Form.Label>
                        <br></br>
                        <Form.Check inline label="Runs tight" value="1" type="radio" checked={fit === "1"} onChange={(e) => setFit(e.target.value)}/>
                        <Form.Check inline label="Runs slightly tight" value="2" type="radio" checked={fit === "2"} onChange={(e) => setFit(e.target.value)}/>
                        <Form.Check inline label="Perfect" value="3" type="radio" checked={fit === "3"} onChange={(e) => setFit(e.target.value)}/>
                        <Form.Check inline label="Runs slightly long" value="4" type="radio" checked={fit === "4"} onChange={(e) => setFit(e.target.value)}/>
                        <Form.Check inline label="Runs long" value="5" type="radio" checked={fit === "5"} onChange={(e) => setFit(e.target.value)}/>
                    </Form.Group>
                        <br></br>
                    <Form.Group>
                        <Form.Label>Summary</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setSummary(e.target.value)}
                            placeholder="Ex: Best purchase ever!"
                            rows={1} maxLength="60" required
                        />
                    </Form.Group>
                        <br></br>
                    <Form.Group>
                        <Form.Label>Review</Form.Label>
                        <Form.Control 
                            type="text"
                            onChange={(e) => {
                                setReview(e.target.value)
                                setCharacterCount(e.target.value.length)
                            }}
                            placeholder="Why did you like the product or not?"
                            as="textarea" rows={3}
                            minLength="50" maxLength="1000" required
                        />
                    </Form.Group>
                    <Minimum />
                        <br></br>
                    <Form.Group>
                        <Form.Label>Add photo: (max 5)</Form.Label>
                        <Form.Control
                            type="file" name="image" accept="image/*"
                            onChange={handleSelectImage}
                            multiple
                        />
                        <div>
                            <img src={image} style={{ margin: "10px", width: "200px", height: "200px" }}/>
                            <img src={selectedImages[0]} style={{ margin: "10px", width: "200px", height: "200px" }} />
                            <img src={selectedImages[1]} style={{ margin: "10px", width: "200px", height: "200px" }} />
                            <img src={selectedImages[2]} style={{ margin: "10px", width: "200px", height: "200px" }} />
                            <img src={selectedImages[3]} style={{ margin: "10px", width: "200px", height: "200px" }} />
                        </div>
                    </Form.Group>
                        <br></br>
                    <Form.Group>
                        <Form.Label>Nickname</Form.Label>
                        <Form.Control
                            onChange={(e) => setName(e.target.value)}
                            type="text" placeholder="Ex: jackson11!" 
                            maxLength="60" required
                        />
                        <Form.Text className="text-muted">
                            For privacy reasons, do not use your full name or email address
                        </Form.Text>
                    </Form.Group>
                        <br></br>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" size="30" 
                            placeholder="Ex: jackson11@email.com" 
                            maxLength="60" required
                        />
                        <Form.Text className="text-muted">
                            For authentication reasons, you will not be emailed
                        </Form.Text>
                    </Form.Group>
                </div>
                <Button
                    id="review-submit-btn" type="submit" 
                            onSubmit={(e) => {
                                e.preventDefault()
                                closeModal(false)
                                }
                            }
                    >Submit your review!
                </Button>
            </Form>
        </div>
    )
}

export default ModalForm;


{/* <div className="review-overall">Overall rating:
    <p id="review-choices">
        <input className="review-rate" value="1" {...rateInputProps} checked={rateValue === "1"} />Poor
        <input className="review-rate" value="2" {...rateInputProps} checked={rateValue === "2"} />Fair
        <input className="review-rate" value="3" {...rateInputProps} checked={rateValue === "3"} />Average
        <input className="review-rate" value="4" {...rateInputProps} checked={rateValue === "4"} />Good
        <input className="review-rate" value="5" {...rateInputProps} checked={rateValue === "5"} />Great
    </p>
</div> */}
{/* <div className="review-recc" required>Do you recommend this product?
    <p id="recc-answer" >
        <input id="recc-yes" value="true" type="radio"  {...recInputProps} checked={recValue === "true"} />Yes
        <input id="recc-no" value="false" type="radio" {...recInputProps} checked={recValue === "false"} />No
    </p>
</div> */}
{/* <div className="review-photos">Add photo: (max 5)
    <br></br>
    <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleSelectImage}
        multiple
    />
<div>
    <img src={image} style={{ margin: "10px", width: "200px", height: "200px" }}/>
    <img src={selectedImages[0]} style={{ margin: "10px", width: "200px", height: "200px" }} />
    <img src={selectedImages[1]} style={{ margin: "10px", width: "200px", height: "200px" }} />
    <img src={selectedImages[2]} style={{ margin: "10px", width: "200px", height: "200px" }} />
    <img src={selectedImages[3]} style={{ margin: "10px", width: "200px", height: "200px" }} />
</div>
</div> */}
{/* <Characteristics handleChar={handleChar}/> */}
{/* <div className="review-summary">Summary:
    <br></br>
    <textarea 
        type="text" 
        cols="50" 
        placeholder="Ex: Best purchase ever!" 
        maxLength="60"
        onChange={(e) => setSummary(e.target.value)}
        
    />
</div> */}
{/* <div className="review-body">Review: */}
{/* <br></br> */}
{/* <textarea
    onChange={(e) => {
        setReview(e.target.value)
        setCharacterCount(e.target.value.length)
    }}
    type="text" rows="5" cols="50"
    placeholder="Why did you like the product or not?"
    minLength="50" maxLength="1000" required
/> */} {/* </div> */}
{/* <div className="reviewer-name">username:
<br></br>
<input 
    onChange={(e) => setName(e.target.value)}
    type="text" 
    placeholder="Ex: jackson11!" 
    maxLength="60" required
/>
<p style={{ fontSize: "10px" }}>For privacy reasons, do not use your full name or email address</p>
</div> */}
{/* <button id="review-submit-btn" type="submit" 
        onSubmit={e => {
            e.preventDefault()
            closeModal(false)
            }
        }
>Submit your review!</button> */}