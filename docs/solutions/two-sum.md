# 1. 两数之和

> 难度：简单 ｜ 标签：`数组` `哈希表`

## 题目描述

给定一个整数数组 `nums` 和一个目标值 `target`，请你在该数组中找出和为目标值的那两个整数，并返回它们的数组下标。

## 思路分析

遍历数组时，用哈希表存储已经遍历过的值及其下标。对于当前元素 `nums[i]`，检查 `target - nums[i]` 是否在哈希表中，如果在，直接返回两个下标。

## 代码实现

```java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[0];
}