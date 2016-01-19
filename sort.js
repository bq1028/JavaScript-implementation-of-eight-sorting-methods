var Sort = function () {
	// 直接插入排序
	function StraightInsertSort (arr) {
		var i, j, current, len;
		for (i = 1, len = arr.length; i < len; i++) {
			j = i - 1;
			current = arr[i];
			while (j >= 0 && arr[j] > current) {
				arr[j + 1] = arr[j];
				j--;
			}
			arr[j + 1] = current;
		}
	}
	// 希尔插入排序 
	// 带增量的直接插入排序
	function Shell (delta, arr) {
		var i, j, current, len;
		for (i = delta, len = arr.length; i < len; i++) {
			j = i - delta;
			current = arr[i];
			while (j >= 0 && arr[j] > current) {
				arr[j + delta] = arr[j];
				j = j - delta;
			}
			arr[j + delta] = current;
		}
	}
	function ShellInsertSort (arr) {
		var delta;  // delta为分组数
		for (delta = arr.length / 2; delta >= 1; delta /= 2) {
			Shell(delta, arr);
		}
	}
	// 冒泡排序
	function BubbleExchangeSort (arr) {
		var i, j, temp, flag, len = arr.length;
		for (i = 0; i < len - 1; i++) {
			flag = false;
			for (j = len - 1; j > i; j--) {
				if (arr[j] < arr[j - 1]) {
					temp = arr[j - 1];
					arr[j - 1] = arr[j];
					arr[j] = temp;
					flag = true;
				}
			}
			if (!flag) break;
		}
	}
	// 快速排序
	function QuickSort (arr, left, right) {
		if (left > right) throw new Error('传入参数有误');
		var current = arr[left],
			i = left,
			j = right,
			temp;
		// 确定数组第一个元素的位置
		while (i < j) {
			while (arr[j] > current && i < j) 
				j--;
			while (arr[i] <= current && i < j)
				i++;
			if (i < j) {
				temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
		}
		arr[left] = arr[j];
		arr[j] = current;
		if (left < j - 1) QuickSort(arr, left, j - 1); 
		if (right > j + 1) QuickSort(arr, j + 1, right);
	}
	function QuickExchangeSort (arr) {
		QuickSort(arr, 0, arr.length - 1);
	}
	// 归并排序
	function MergeResolve (arr, gap, length) {
		var i;
		for (i = 0; i + 2 * gap - 1 < length; i = i + 2 * gap) {
			MergeArray(arr, i, i + gap - 1, i + 2 * gap - 1);
		}
		// 假若后面的个数小于前待排序数组的元素个数
		if (i + gap - 1 < length) {
			MergeArray(arr, i, i + gap - 1, length - 1);
		}
	}
	function MergeArray (arr, first, mid, last) {
		var m = mid,
			n = last,
			i = first,
			j = mid + 1,
			k = 0, 
			temp = [];
		while (i <= m && j <= n) {
			if (arr[i] < arr[j]) {
				temp[k++] = arr[i++];
			} else {
				temp[k++] = arr[j++];
			}
		}
		while (i <= m) {
			temp[k++] = arr[i++];
		}
		while (j <= n) {
			temp[k++] = arr[j++];
		}
		for (i = 0; i < k; i++) {
			arr[first + i] = temp[i];
		}
	}
	function MergeSort (arr) {
		for (var gap = 1, len = arr.length; gap < len; gap *= 2) {
			MergeResolve(arr, gap, len);
		}
	}
	// 直接选择排序
	function StraightSelectSort (arr) {
		var i, j, len = arr.length;
		for (i = 0; i < len - 1; i++) {
			var k = i;
			var current = arr[k];
			for (j = i + 1; j < len; j++) {
				if (arr[j] < current) {
					current = arr[j];
					k = j;
				}
			}
			if (k !== i) {
				arr[k] = arr[i];
				arr[i] = current;
			}
		}
	}
	// 构建大根堆进行堆排序
	function HeapSelectSort (arr) {
		var len = arr.length,
			i,			
			result = new Int32Array(len + 1); 
		for (i = 1; i < len + 1; i++) {
			result[i] = arr[i - 1];
		}
		for (i = (len / 2) | 0; i >= 1; i--) {
			Restore(result, i, len);
		}
		for (i = len; i > 1; i--) {
			var temp = result[i];
			result[i] = result[1];
			result[1] = temp;
			Restore(result, 1, i - 1);
		}
		for (i = 0; i < len; i++) {
			arr[i] = result[i + 1];
		} 
	}
	// 构建大根堆
	function Restore (arr, j, count) {
		while (j <= count / 2) {
			// 找出左右孩子中最大的索引
			var m = (2 * j + 1 <= count && arr[2 * j + 1] > arr[2 * j]) ? 2 * j + 1 : 2 * j;
			if (arr[m] > arr[j]) {
				var temp = arr[m];
				arr[m] = arr[j];
				arr[j] = temp;
				j = m;
			} else {
				break;
			}
		}
	}
	// 利用LSD进行基数排序
	function getDigit (key, d) {
		return (key / getDigit.arr[d - 1] | 0) % 10;
	}
	getDigit.arr = [1, 10, 100];
	function RadixLSDSort (arr, digit) {
		const radix = 10;   // 基数,以10进制来进行排序
		var i = 0, 
			j = 0,
			count = Array(radix), // 0~9的桶
			end = arr.length,
			bucket = Array(end);
		// 利用LSD,也就是次位优先
		for (var d = 1; d <= digit; d++) {
			for (i = 0; i < radix; i++) {
				count[i] = 0;
			}
			// 向各个桶中添加元素,并统计出每个桶中装的个数
			for (i = 0; i < end; i++) {
				j = getDigit(arr[i], d);
				count[j]++;
			}
			// count的越往后值最大,最大值为arr.length
			// count数组的值为,该位数值为该索引的数字总数
			for (i = 1; i < radix; i++) {
				count[i] = count[i] + count[i - 1];
			}
			// 按照桶的顺序将导入temp中
			for (i = end - 1; i >= 0; i--) {
				j = getDigit(arr[i], d);
				bucket[count[j] - 1] = arr[i];
				count[j]--; 
			}
			// 将已经根据相应位数排好的序列导回arr中
			for (i = 0; i < end; i++) {
				arr[i] = bucket[i];
			}
		}	
	}
	return {
		StraightInsertSort: StraightInsertSort,
		ShellInsertSort: ShellInsertSort,
		BubbleExchangeSort: BubbleExchangeSort,
		QuickExchangeSort: QuickExchangeSort,
		MergeSort: MergeSort,
		HeapSelectSort: HeapSelectSort,
		StraightSelectSort: StraightSelectSort,
		RadixLSDSort: RadixLSDSort
	};
}();