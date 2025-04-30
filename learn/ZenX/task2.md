## 第二章：Solidity 快速入门

### 一、填空题

1. Solidity中存储成本最高的变量类型是`状态`变量，其数据永久存储在区块链上。  
2. 使用`constant`关键字声明的常量可以节省Gas费，其值必须在编译时确定。  
4. 当合约收到不带任何数据的以太转账时，会自动触发`fallback`函数。  

---

### 二、选择题

4. 函数选择器(selector)的计算方法是： B 
   **A)** sha3(函数签名)  
   **B)** 函数名哈希的前4字节  
   **C)** 函数参数的ABI编码  
   **D)** 函数返回值的类型哈希  

5. 以下关于mapping的叙述错误的是：  C
   **A)** 键类型可以是任意基本类型  
   **B)** 值类型支持嵌套mapping  
   **C)** 可以通过`length`属性获取大小  
   **D)** 无法直接遍历所有键值对  

---

### 三、简答题

6. 请说明`require`、`assert`、`revert`三者的使用场景差异（从触发条件和Gas退还角度）
require：用于验证输入条件，失败时会退还剩余的Gas。
assert：用于检查不变量，失败时不会退还Gas。
revert：用于条件不满足时中止执行，退还剩余的Gas。

7. 某合约同时继承A和B合约，两者都有`foo()`函数：

```solidity
contract C is A, B {
    function foo() override(A,B) {...}
}
```

实际执行时会调用哪个父合约的函数？为什么？
实际执行时会调用继承顺序中最右边的合约的foo()函数。在这个例子中，B合约的foo()函数会被调用，因为B在继承列表中位于A的右边。

8. 当使用`call`方法发送ETH时，以下两种写法有何本质区别？

```solidity
(1) addr.call{value: 1 ether}("")
(2) addr.transfer(1 ether)
```
(1) addr.call{value: 1 ether}("")：使用低级call方法，返回布尔值表示成功与否，不会自动抛出异常。
(2) addr.transfer(1 ether)：使用transfer方法，自动抛出异常，确保安全性。
