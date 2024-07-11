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
	style={{display: visible ? 'inline' : 'none'}} className='md:mb-96 md:left-90 md:text-3xl md:hover:scale-125 md:transition-all sm:text-2xl text-xl 	mb-[99px] -translate-x-2 -translate-y-28 transition-all'/> 
	</Button> 
); 
} 

export default ScrollToTop; 
