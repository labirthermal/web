#include "pch.h"
#include "DateTime.h"

/// <summary>
/// Gets the current date and UTC time in milliseconds since 1.1.1970.
/// </summary>
/// <returns>Returns the current date and local time in milliseconds.</returns>
uint64_t DateTime::Now()
{
#ifdef WIN32
	timeb t;
	ftime(&t);
	return (uint64_t)t.time * 1000LL + t.millitm;
#else
	timeval t;
	gettimeofday(&t, NULL);
	return (uint64_t)t.tv_sec * 1000LL + t.tv_usec / 1000;
#endif
}

/// <summary>
/// Converts time to binary int64 representation compatible with C# DateTime.
/// </summary>
/// <remarks>
/// Adopted from .NET reference implementation https://referencesource.microsoft.com/#mscorlib/system/datetime.cs
/// </remarks>
/// <param name="timeMs">UTC time in milliseconds since 1.1.1970.</param>
/// <returns>Returns the time as binary int64.</returns>
int64_t DateTime::TimeToBinary(uint64_t timeMs)
{
	// offset base from 1.1.1970 to 1.1.0001, convert milliseconds to ticks
	int64_t ticks = (timeMs + UnixEpoch) * TicksPerMillisecond;

	// set time kind as local
	return ticks | (int64_t)LocalMask;
}

/// <summary>
/// Converts time from binary int64 representation compatible with C# DateTime.
/// </summary>
/// <remarks>
/// Adopted from .NET reference implementation https://referencesource.microsoft.com/#mscorlib/system/datetime.cs
/// </remarks>
/// <param name="timeBin">The time as binary int64.</param>
/// <returns>Returns the UTC time in milliseconds since 1.1.1970.</returns>
uint64_t DateTime::TimeFromBinary(int64_t timeBin)
{
	// get the ticks without flags
	int64_t ticks = timeBin & (int64_t)TicksMask;

	// if it is a local time
	if (timeBin & (int64_t)LocalMask)
	{
		// restore eventual negative value
		if (ticks > TicksCeiling - TicksPerDay)
			ticks -= TicksCeiling;

		// wrap small times around
		if (ticks < 0)
			ticks += TicksPerDay;
	}

	// convert ticks to milliseconds, offset base from 1.1.0001 to 1.1.1970
	return ticks / TicksPerMillisecond - UnixEpoch;
}
