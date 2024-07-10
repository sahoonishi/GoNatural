import React, {useState} from 'react'; 
import {FaArrowCircleUp} from 'react-icons/fa'; 
import { Button } from './Styles'; 

const ScrollToTop = () =>{ 

const [visible, setVisible] = useState(false) 

const toggleVisible = () => { 
	const scrolled = document.documentElement.scrollTop; 
	if (scrolled > 900){ 
	setVisible(true) 
	} 
	else if (scrolled <= 900){ 
	setVisible(false) 
	} 
}; 

const scrollToTopp = () =>{ 
	window.scrollTo({ 
	top: 0, 
	behavior: 'smooth'

	}); 
}; 

window.addEventListener('scroll', toggleVisible); 

return ( 
	<Button> 
	<FaArrowCircleUp onClick={scrollToTopp} 
	style={{display: visible ? 'inline' : 'none'}} className='mb-96 left-90 text-3xl hover:scale-125 transition-all'/> 
	</Button> 
); 
} 

export default ScrollToTop; 
