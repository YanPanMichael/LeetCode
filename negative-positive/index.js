// 假设一整型数组存在若干正数和负数，现在通过某种算法使得该数组的所有负数在正数的左边，且保证负数和正数间元素相对位置不变。时空复杂度要求分别为：o(n)和o(1)



// 解题思路:

// 假设X代表正数，Y代表负数，下标代表正负数的序列位置，数组大小为arraySize

// 设有一数组 [X1, Y1, Y2, X2, Y3, Y4, X3, Y5, X4, X5]  (可以理解为 [1, -1, -2, 2, -3, -4, 3, -5, 4, 5]

// 解题目标是把数组变为[Y1, Y2, Y3, Y4, Y5, X1, X2, X3, X4, X5] 而且时间复杂度为O(N), 空间复杂度为O(1)



// step1:

// 扫描数组，可以指导数组中正数的数目 positiveNum



// step2:

// 根据step1中得知的正数数目把数组分为两部分，第一部分大小为  arraySize-positiveNum，第二部分大小为positiveNum

// [X1, Y1, Y2, X2 Y3] [Y4, X3, Y5, X4, X5]

// 并且对所得的两个子数组继续采用相同的划分方式进行递归操作

// ([X1, Y1, Y2] [X2, Y3])                      ([Y4, X3][Y5, X4, X5])

// (([X1, Y1][Y2])  ([X2][Y3]))              (([Y4][X3])  ([Y5][X4, X5]))

// (([X1][Y1]) [Y2] ) ([X2][Y3]))           (([Y4][X3])  ([Y5][X4, X5]))

// 这样划分的思想是: 

// 当前一数组和后一数组分别完成排序后，前一数组中的正数等于后一数组中的负数，因为后一数组的大小就是原来整个数组中正数的大小

// 举个例子: 

// 假设在数组 [X1, Y1, Y2, X2, Y3, Y4, X3, Y5, X4, X5] 中，数组的划分为，后一数组的大小为正数的大小，为5

// [X1, Y1, Y2, X2 Y3] [Y4, X3, Y5, X4, X5]

// 当前一数组和后一数组分别完成排序后为

// [Y1, Y2, Y3, X1, X2] [Y4, Y5, X3, X4, X5]

// 因为正数的数目为5，前一数组中正数的数目(X1, X2)等于后一数组中的负数数目(Y4, Y5)



// step3:

// 对于每两个不能再划分的子数组，进行归并。归并规则为把前一数组中的正数(如果有的话)和后一数组中的负数的位置进行一一互换

// (([Y1, X1] [Y2]) [Y3, X2])                     ([Y4, X3] [Y5, X4, X5])

// ([Y1, Y2, X1][Y3, X2])                          ([Y4, Y5, X3, X4, X5])

// ([Y1, Y2, Y3, X1, X2])                           ([Y4, Y5, X3, X4, X5])

// ([Y1, Y2, Y3, Y4, Y5, X1, X2, X3, X4, X5])



// 算法代码：


int getPositiveNum(int *pArray, int arraySize)
{
    int count = 0;
 
 
    if (pArray == NULL || arraySize <= 0)
    {
        return 0;
    }
 
 
    for (int idx = 0; idx < arraySize; idx++)
    {
        if (pArray[idx] > 0)
        {
            count++;
        }
    }
    return count;
}
 
 
void swap(int *a, int *b)
{
    int tmp;
 
    tmp = *a;
    *a  = *b;
    *b  = tmp;
}
 
 
 
int sortArray(int *pArray, int arraySize)
{
    int positiveNum = getPositiveNum(pArray, arraySize);
 
 
    // if there is no positive number in the array, just return
    if (positiveNum == 0)
    {
        return 0;
    }
 
 
    // if there is no negative number in the array, just return
    if (positiveNum == arraySize)
    {
        return positiveNum;
    }
 
 
    /*
    *  here what we going to do is
    *  setup two sub arrays, 
    *  so the first sub array only have the nagtive number
    *  the secnod sub array only have the positive number
    */
 
    // here we can decide the size of each of the two sub array
    int firstArraySize = arraySize-positiveNum;
    int secnodArraySize = positiveNum;
 
 
    /*
    *  here we recursively separate the two sub array
    *  after separation, we need to know how many positive numbers in the fist array
    *  (that is also how many negative numbers in the secnod array)
    */
    int positiveNumInFirstArray = sortArray(pArray, firstArraySize);
    sortArray(&pArray[arraySize-positiveNum], secnodArraySize);
 
 
    /*
    *  here we presume that in each of the two sub array
    *  negative numbers are in the front position, and they are in the right position
    *  positive numbers are in the rear position, and they are in the right position
    *  so, what we need to do is 
    *  swap each of the positive number in the first array and the negatinve number in the second array
    */
    if (positiveNumInFirstArray > 0)
    {
        for (int pos = arraySize-positiveNum-positiveNumInFirstArray; pos <= arraySize-positiveNum-1; pos++)
        {
            swap(&pArray[pos], &pArray[pos + positiveNumInFirstArray]);
        }	
    }
 
    return positiveNum;
}

// 测试代码：

void printArray(int *pArray, int arraySize)
{
    for (int idx = 0; idx < arraySize; idx++)
    {
        printf("%d ", pArray[idx]);
    }
}
 
int _tmain(int argc, _TCHAR* argv[])
{
    int intArray[] = {1,-1,-2,2,-3,-4,3,-5,4,5,-6,6,-7,-8,7,-9,8,9,10,-10};
    int sizeArray = sizeof(intArray)/sizeof(intArray[0]);
	
    printf("Before sorting the array------------\n");
    printArray(intArray, sizeArray);
 
    sortArray(intArray, sizeArray);
 
    printf("After sorting the array-------------\n");
    printArray(intArray, sizeArray);