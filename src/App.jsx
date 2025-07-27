import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function App() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  // This function is called when the form is submitted and valid
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Send a POST request to our backend's /api/contact endpoint
      const response = await axios.post('https://contact-us-backend-jjw6.onrender.com', data);

      setSubmitMessage({ type: 'success', text: 'Thank you! Your message has been sent.' });
      reset(); // Clear the form fields
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">Contact Us</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { 
                required: "Email is required", 
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } 
              })}
              className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 text-sm font-medium">Message</label>
            <textarea
              id="message"
              rows="4"
              {...register("message", { required: "Message is required" })}
              className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
            ></textarea>
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-gray-500 transition-colors"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitMessage && (
            <p className={`mt-4 text-center text-sm ${submitMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {submitMessage.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;