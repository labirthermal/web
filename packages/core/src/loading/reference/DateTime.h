#pragma once
#include "pch.h"

/// <summary>
/// Holds date and time information. Provides methods for conversion.
/// </summary>
class LRCRECORDING_API DateTime
{
private:
	/// <summary>
	/// Unix base date 1.1.1970 as number of milliseconds since 1.1.0001.
	/// </summary>
	static const uint64_t UnixEpoch = 62135596800000;
	
	// Constants from .NET reference implementation https://referencesource.microsoft.com/#mscorlib/system/datetime.cs
	static const int64_t TicksPerMillisecond = 10000;
	static const int64_t TicksPerDay = 24 * 60 * 60 * 1000 * TicksPerMillisecond;
	static const int64_t TicksCeiling = 0x4000000000000000;
	static const uint64_t LocalMask = 0x8000000000000000;
	static const uint64_t TicksMask = 0x3FFFFFFFFFFFFFFF;



public:
	/// <summary>
	/// Gets the current date and UTC time in milliseconds since 1.1.1970.
	/// </summary>
	/// <returns>Returns the current date and UTC time in milliseconds.</returns>
	static uint64_t Now();

	/// <summary>
	/// Converts time to binary int64 representation compatible with C# DateTime.
	/// </summary>
	/// <remarks>
	/// Adopted from .NET reference implementation https://referencesource.microsoft.com/#mscorlib/system/datetime.cs
	/// </remarks>
	/// <param name="timeMs">UTC time in milliseconds since 1.1.1970.</param>
	/// <returns>Returns the time as binary int64.</returns>
	static int64_t TimeToBinary(uint64_t timeMs);

	/// <summary>
	/// Converts time from binary int64 representation compatible with C# DateTime.
	/// </summary>
	/// <remarks>
	/// Adopted from .NET reference implementation https://referencesource.microsoft.com/#mscorlib/system/datetime.cs
	/// </remarks>
	/// <param name="timeBin">The time as binary int64.</param>
	/// <returns>Returns the UTC time in milliseconds since 1.1.1970.</returns>
	static uint64_t TimeFromBinary(int64_t timeBin);
};

