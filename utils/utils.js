// arr1中的所有元素都会出现，arr2是全数据数组
export const mergeArrays = (arr1 = [], arr2 = []) => {
	let res = [];
	res = arr1.map(obj => {
		const index = arr2.findIndex(el => el["user_id"] == obj["Name"]);
		return {
			...obj,
			...arr2[index]
		};
	});
	return res;
};

// 返回标准化格式时间
export function getDate(type) {
	const date = new Date();

	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year;
	} else if (type === 'end') {
		year = year + 10;
	}
	month = month > 9 ? month : '0' + month;;
	day = day > 9 ? day : '0' + day;

	return `${year}-${month}-${day}`;
}

// 订单打卡工具函数：计算两个日期之间的间隔天数,包含当天（取闭区间[]）
export function calculateDaysDifference(startDateStr, endDateStr) {
	const startDate = new Date(startDateStr);
	const endDate = new Date(endDateStr);

	// 通过getTime()方法获取从1970年1月1日至今的毫秒数，然后计算时间差
	const timeDifference = endDate.getTime() - startDate.getTime();
	const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

	return daysDifference + 1;
}

// 订单打卡工具函数：返回指定日期是日期范围中的第几天下标：0,1,2...
export function calculateDayInPeriod(startDateStr, endDateStr, targetDateStr) {
	const startDate = new Date(startDateStr);
	const endDate = new Date(endDateStr);
	const targetDate = new Date(targetDateStr);

	if (targetDate < startDate || targetDate > endDate) {
		return -1; // 目标日期不在时间段内
	}

	const timeDifferenceStart = targetDate.getTime() - startDate.getTime();
	const daysDifferenceStart = Math.ceil(timeDifferenceStart / (1000 * 60 * 60 * 24));

	return daysDifferenceStart;
}

// 订单打卡工具函数：初始化打卡状态数组, 0未打卡，1已打卡
export function createPunchList(startDateStr, endDateStr) {
	let length = calculateDaysDifference(startDateStr, endDateStr)
	let list = []
	for (let i = 0; i < length; i++) {
		list.push(0)
	}
	return list.join(",")
}

// 订单打卡工具函数：根据当天日期打卡,更新打卡状态数组
export function punch(punchListStr, startDateStr, endDateStr, targetDateStr) {
	let list = punchListStr.split(",")
	list[calculateDayInPeriod(startDateStr, endDateStr, targetDateStr)] = 1
	return list.join(",")
}

// 订单打卡工具函数：更新当天打卡图片
export function imgPunch(imgPunchListStr, imgSrc, startDateStr, endDateStr, targetDateStr) {
	let list = imgPunchListStr.split(",")
	list[calculateDayInPeriod(startDateStr, endDateStr, targetDateStr)] = imgSrc
	return list.join(",")
}

// 订单打卡工具函数：传入开始、结束时间，跟打卡状态字符串，返回已打卡日期
export function filterDates(start_time, end_time, punchStr) {
	let dataArray = punchStr.split(',')
	const startDate = new Date(start_time);
	const endDate = new Date(end_time);
	const result = [];

	let currentDate = new Date(startDate);

	// Loop through the date range and check if the corresponding array item is 1
	while (currentDate <= endDate) {
		const arrayIndex = (currentDate - startDate) / (24 * 60 * 60 * 1000);
		if (dataArray[arrayIndex] == 1) {
			const formattedDate = currentDate.toISOString().slice(0, 10);
			result.push(formattedDate);
		}

		// Move to the next day
		currentDate.setDate(currentDate.getDate() + 1);
	}
	return result;
}

// 订单打卡工具函数：传入开始、结束时间，返回时间段内所有日期数组
export function getAllDates(start_time, end_time) {
	const startDate = new Date(start_time);
	const endDate = new Date(end_time);
	const result = [];

	let currentDate = new Date(startDate);

	// Loop through the date range and check if the corresponding array item is 1
	while (currentDate <= endDate) {
		const formattedDate = currentDate.toISOString().slice(0, 10);
		result.push(formattedDate);
		// Move to the next day
		currentDate.setDate(currentDate.getDate() + 1);
	}
	return result;
}



// 时间转换函数：2023-07-04T10:43:24+08:00 => 2023-07-04
export function convertDateTimeStringToDate(dateTimeString) {
	const date = new Date(dateTimeString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}