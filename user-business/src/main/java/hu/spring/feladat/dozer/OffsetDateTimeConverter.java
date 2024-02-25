package hu.spring.feladat.dozer;

import java.time.OffsetDateTime;

import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.springframework.stereotype.Component;

@Component
public class OffsetDateTimeConverter implements Converter<OffsetDateTime, OffsetDateTime> {

	@Override
	public OffsetDateTime convert(MappingContext<OffsetDateTime, OffsetDateTime> context) {

		OffsetDateTime destination = context.getDestination();
		OffsetDateTime source = context.getSource();

		if (source == null) {
			destination = null;

			// use instance of source because otherwise it seems to be not possible to
			// handle the package protected ZoneRegion class
		} else {

			OffsetDateTime srcObject = (OffsetDateTime) source;
			destination = OffsetDateTime.of(srcObject.getYear(), srcObject.getMonthValue(), srcObject.getDayOfMonth(),
					srcObject.getHour(), srcObject.getMinute(), srcObject.getSecond(), srcObject.getNano(),
					srcObject.getOffset());
		}
		// use instance of source because otherwise it seems to be not possible to
		// handle the package protected ZoneRegion class

		return destination;
	}
}
