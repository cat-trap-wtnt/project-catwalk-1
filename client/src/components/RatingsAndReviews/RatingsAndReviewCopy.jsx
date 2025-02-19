/* eslint-disable react/prop-types */
import React from 'react';
import Ratings from './Ratings/Ratings.jsx';
import ReviewsList from './Reviews/ReviewsList.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

class RatingsAndReviewsCopy extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props)

        this.state = {
            reviews: [],
            metadata: {}
        }
        this.getReviews = this.getReviews.bind(this)
        this.getRatings = this.getRatings.bind(this)
    }
    componentDidMount() {
        this._isMounted = true;
        this.getReviews()
        this.getRatings()
    }
    // TODO: make axios call to retrieve specific product id reviews
    getReviews() {
        axios.get(`/reviews/${this.props.currentProduct.product_id}`)
            .then(({data}) => this.setState({ reviews: data.results }))
            .catch(err => console.error(err))        
    }
    getRatings() {
        axios.get(`/reviews/meta/${this.props.currentProduct.product_id}`)
            .then(({data}) => this.setState({ metadata: data }))
            .catch(err => console.error(err))
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        
        // console.log('reviews: ', this.state.reviews)
        //console.log('metadata: ', this.state.metadata)
        const {reviews, metadata} = this.state
        return (
            <div>
                <Container className="rr-container" fluid="md">
                    <Row>
                        <Col xs={4}>
                            <h5 id="rr-header">RATINGS & REVIEWS</h5>
                            <div className="ratings-container">
                                <Ratings 
                                 metadata={metadata}
                                
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="reviews-container">
                                <ReviewsList 
                                 currentProduct={this.props.currentProduct}                        
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }    
}


export default RatingsAndReviewsCopy;