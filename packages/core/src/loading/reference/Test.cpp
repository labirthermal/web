// Test.cpp : Defines the entry point for the console application.
// For testing the LRCWriter
//

#include "stdafx.h"

using namespace std;

/// <summary>
/// Test the simplest reading from a recording.
/// </summary>
/// <param name="fileName">The recording file name.</param>
int SimpleTest(string fileName)
{
	// open the recording
	ifstream rec(fileName, ifstream::binary);

	// FILE HEADER

	// 4 bytes file signature "LRC\0"
	// 
	// check the file signature, should be "LRC\0"
	char signature[4];
	rec.read(signature, 4);
	if (strcmp(signature, "LRC\0"))
		return LRC_ERR_FILE_SIGNATURE;

	// 1 byte file version
	// 
	// read the file version, should be 2
	char lrcVersion;
	rec.read(&lrcVersion, sizeof(uint8_t));
	if (lrcVersion != 2)
		return LRC_ERR_FILE_VERSION;

	// 10 bytes
	// 
	// skip
	rec.seekg(10, ifstream::cur);

	// 2 * 1 byte data type and units
	// 
	// read stream information, type should be 1 (float), units should be 2 (Celsius)
	char streamType, streamUnits;
	rec.read(&streamType, 1);
	rec.read(&streamUnits, 1);
	if (streamType != 1 || streamUnits != 2)
		return LRC_ERR_GENERAL;

	// 2 * 2 bytes resolution
	// 
	// read the resolution
	uint16_t width, height;
	rec.read((char*)&width, 2);
	rec.read((char*)&height, 2);

	// 4 bytes
	// 
	// skip
	rec.seekg(4, ifstream::cur);

	// FRAME HEADER

	// 8 byte timestamp
	//
	// read the frame timestamp
	int64_t timeBin;
	rec.read((char*)&timeBin, 8);
	uint64_t timestamp = DateTime::TimeFromBinary(timeBin);

	// 2 * 4 bytes (float) minimum, maximum temperature in frame
	//
	// read the frame temperature range
	float tMin, tMax;
	rec.read((char*)&tMin, 4);
	rec.read((char*)&tMax, 4);

	// 41 bytes
	//
	// skip
	rec.seekg(41, ifstream::cur);

	// FRAME DATA

	// width * height * 4 byte (float) temperature data
	//
	// read the frame data
	float* data = new float[width * height];
	rec.read((char*)data, width * height * sizeof(float));

	// done
	delete[] data;
	rec.close();
}

/// <summary>
/// Application entry point.
/// Tests recording to LRC format.
/// </summary>
int main()
{
	string recordingName = "D:\\SEQ\\image-thermal 2021-06-10 12-40-01.lrc";

	return SimpleTest(recordingName);
}
