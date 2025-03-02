import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext'; // Update the path
import axios from 'axios';
import { Spinner, Form, Button, Container, Row, Col } from 'react-bootstrap';
import Footer from '../Footer';
import DashboardNavbar from './DashboardNavbar'; // Adjusted import to avoid name conflict

const Profile = () => {
    const { user, setUser, loading } = useContext(UserContext);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        city: user?.city || '',
        bio: user?.bio || '',
        favoriteCards: user?.favoriteCards || [], // Adjusted based on MongoDB field
        profileImageUrl: user?.profileImageUrl || '', // Adjusted based on MongoDB field
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profileImageUrl: reader.result }); // Set the image data in the state
            };
            reader.readAsDataURL(file); // Convert the file to a base64 URL
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Get JWT token from local storage
            const response = await axios.put('http://localhost:5000/api/users/profile', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data); // Update user context with the new data
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    if (loading) {
        return <Spinner animation="border" variant="primary" />; // Show spinner while loading
    }

    return (
        <>
            <DashboardNavbar />  {/* Navbar Component */}
            <Container className="profile-container" style={{ paddingTop: '60px' }}>
                <h2 className="text-center mb-4">Profile</h2>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled // Full Name is not editable
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled // Email is not editable
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Enter city"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Profile Image</Form.Label>
                                {formData.profileImageUrl ? (
                                    <div>
                                        <img 
                                            src={formData.profileImageUrl} 
                                            alt="Profile" 
                                            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                                        />
                                    </div>
                                ) : (
                                    <p>No image uploaded</p>
                                )}
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    name="profileImageUrl"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Tell us something about yourself"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Favorite Tarot Cards</Form.Label>
                        <Form.Control
                            type="text"
                            name="favoriteCards"
                            value={formData.favoriteCards.join(', ')} // Display as comma-separated string
                            onChange={(e) => setFormData({ ...formData, favoriteCards: e.target.value.split(', ') })}
                            placeholder="Enter favorite tarot cards, separated by commas"
                        />
                    </Form.Group>
                    <h4>Social Media Handles</h4>
                    <Row>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Facebook</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="facebook"
                                    value={formData.facebook}
                                    onChange={handleChange}
                                    placeholder="Enter Facebook URL"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Twitter</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="twitter"
                                    value={formData.twitter}
                                    onChange={handleChange}
                                    placeholder="Enter Twitter URL"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Instagram</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="instagram"
                                    value={formData.instagram}
                                    onChange={handleChange}
                                    placeholder="Enter Instagram URL"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                        Update Profile
                    </Button>
                </Form>
            </Container>
            <Footer />
        </>
    );
};

export default Profile;
