import * as React from 'react';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineOppositeContent,
    TimelineDot,
} from '@mui/lab';
import {
    Box,
		Typography,
} from '@mui/material';
import TripOriginIcon from '@mui/icons-material/TripOrigin';

import step1 from '../assets/step-1.jpg';
import step2 from '../assets/step-2.jpg';
import step3 from '../assets/step-3.jpg';
import step4 from '../assets/step-4.jpg';
import step5 from '../assets/step-5.jpg';
import step6 from '../assets/step-6.jpg';

export default function CustomizedTimeline() {

	const TimelineItemComponent = ({ title="Title", description="Description...", img="" }) => (
		<TimelineItem>
			<TimelineOppositeContent
				sx={{ m: 'auto 0' }}
				align="right"
				variant="h5"
				color="text.primary"
			>
				{title}
			</TimelineOppositeContent>
			<TimelineSeparator>
				<TimelineConnector />
				<TimelineDot>
					<TripOriginIcon />
				</TimelineDot>
				<TimelineConnector />
			</TimelineSeparator>
			<TimelineContent sx={{ py: '12px', px: 2 }}>
				<Typography variant="body1" color="text.secondary" component="span">
					{description}
				</Typography>
				<Box sx={{ m: 1 }}>
					<img
							src={img}
							loading="lazy"
							width="350"
							style={{ resize: 'contain' }}
					/>
				</Box>
			</TimelineContent>
		</TimelineItem>
	)

  return (
    <Timeline position="alternate">
			<TimelineItemComponent 
				title="Step 1"
				description="Click on the Icon highlighted in red boundary box to navigate to the link (opens a new tab)."
				img={step1}
			/>
			<TimelineItemComponent 
				title="Step 2"
				description="Find the item right below 'Table of Contents'. This is the reference point to best proceed forward in the following steps."
				img={step2}
			/>
			<TimelineItemComponent 
				title="Step 3"
				description="Right-click the item in Step 2, and you will be able to see an option 'Inspect'. This will open up the 'Developer Tools' later in Step 4."
				img={step3}
			/>
			<TimelineItemComponent 
				title="Step 4"
				description="Once you click 'Inspect', you will be able to see a mass of text. This are HTML if you are familiar with web development. Do not be intimidated. Ensure that you are in the 'Elements' section on the top-most menu, and have focused on a particular line (i.e. highlight in light-blue). This means that you correctly 'right-clicked' the item in Step 2 and 3."
				img={step4}
			/>
			<TimelineItemComponent 
				title="Step 5"
				description="Search for a tag / element that starts with '<nav ....'. This is what we need to proceed onto Step 6. This is also the reason why we need to 'right-click' on the right item to gain easy access to this tag / element."
				img={step5}
			/>
			<TimelineItemComponent 
				title="Step 6"
				description="This is the last step. Right-click on the tag / element, hover of 'Copy', and click on 'Copy element'. The full element (including all the children elements - starting with '<a ...' will be copied into your clipboard. Now, proceed back to our working webpage and paste this into the input text area box."
				img={step6}
			/>
    </Timeline>
  );
}
