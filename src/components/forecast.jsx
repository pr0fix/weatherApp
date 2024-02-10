import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import { Divider, Typography, Box } from "@mui/joy";

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

	const capitalize = (str) => {
		for (let i = 0; i < str.length; i++) {
			const newStr = str.charAt(0)[i].toUpperCase()
			console.log(newStr)
			return newStr.concat(str.substring(1))
		}
	}

	return (
		<>
			<Typography color="neutral" level="h2" sx={{ display: "flex", justifyContent: "center" }}>7-day forecast</Typography>
			<Divider inset="context" sx={{ my: 2, padding: "0", margin: '0', }}></Divider>
			{forecastData ? (
				<Accordion allowZeroExpanded>
					{forecastData.list.slice(0, 7).map((_, i) => (
						<AccordionItem key={i}>
							<AccordionItemHeading>
								<AccordionItemButton>
									<Box sx={{ display: "flex", alignItems: "center" }}>
										{forecastData.list[i]?.weather[0]?.icon && (
											<img
												style={{ width: "15%", backgroundColor: "grey", borderRadius: '10px', margin: '2px' }}
												src={`https://openweathermap.org/img/wn/${forecastData.list[i].weather[0].icon}@2x.png`}
												alt="weather icon"
											/>
										)}
										<Box sx={{ display: "flex", flexDirection: "column", marginLeft: "30px" }}>
											<Typography variant="body1" sx={{ fontWeight: "bold" }}>{forecastDays[i]}</Typography>
											<Typography variant="body2">{capitalize(forecastData.list[i].weather[0].description)}</Typography>
											<Typography variant="body2">{`Min: ${(forecastData.list[i].main.temp_min).toFixed(0)} \u00b0C / Max: ${(forecastData.list[i].main.temp_max).toFixed(0)} \u00b0C`}</Typography>
										</Box>
									</Box>
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
