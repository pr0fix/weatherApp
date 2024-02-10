import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";

// An array containing names of weekdays
const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Forecast component responsible for displaying weather forecast
const Forecast = ({ forecastData }) => {
	// Get the current day of the week
	const dayInWeek = new Date().getDay();
	// Slice the WEEK_DAYS array to start from the current day and rearrange it to the end of the list
	const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(
		WEEK_DAYS.slice(0, dayInWeek)
	);

	return (
		<>
			<label className="title">Daily</label>
			{forecastData ? (
				<Accordion allowZeroExpanded>
					{forecastData.list.slice(0, 7).map((_, i) => (
						<AccordionItem key={i}>
							<AccordionItemHeading>
								<AccordionItemButton>
									<div className="daily-item">
										{forecastData.list[i]?.weather[0]?.icon && (
											<img
												style={{ width: '20%' }}
												src={`https://openweathermap.org/img/wn/${forecastData.list[i].weather[0].icon}@2x.png`}
												alt="weather icon"
											/>
										)}
										<label className="day">{forecastDays[i]} </label>
										<label className="description">{forecastData.list[i].weather[0].description}</label>
										<label className="min-max">{` ${(forecastData.list[i].main.temp_min).toFixed(0)} \u00b0C / ${(forecastData.list[i].main.temp_max).toFixed(0)} \u00b0C`}</label>
									</div>
								</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel></AccordionItemPanel>
						</AccordionItem>
					))}
				</Accordion>
			) : <p>Loading...</p>
			}
		</>
	);
};

export default Forecast;
