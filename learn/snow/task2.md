## 第二章：Solidity 快速入门

### 一、填空题

1. Solidity中存储成本最高的变量类型是`_storage_`变量，其数据永久存储在区块链上。  
2. 使用`_constant_`关键字声明的常量可以节省Gas费，其值必须在编译时确定。  
4. 当合约收到不带任何数据的以太转账时，会自动触发`_receive_`函数。  

---

### 二、选择题

4. 函数选择器(selector)的计算方法是: B
   **A)** sha3(函数签名)  
   **B)** 函数名哈希的前4字节  
   **C)** 函数参数的ABI编码  
   **D)** 函数返回值的类型哈希  

5. 以下关于mapping的叙述错误的是: C

   **A)** 键类型可以是任意基本类型  
   **B)** 值类型支持嵌套mapping  
   **C)** 可以通过`length`属性获取大小  
   **D)** 无法直接遍历所有键值对  

**下面的内容我阅读了文档，但是目前来说很难回答的准确，我应该需要在实战过程中深入理解这些问题**

### 三、简答题

6. 请说明`require`、`assert`、`revert`三者的使用场景差异（从触发条件和Gas退还角度）

在 Solidity 中，require、assert 和 revert 都用于异常处理，但它们的 触发条件 和 Gas 退还 机制不同：

- 1）require	
检查条件： 输入条件 或 外部状态（如参数校验、余额检查）。	
Gas：退还剩余 Gas（扣除已消耗部分）。	
典型使用场景：验证用户输入、合约前置条件（如 require(msg.value >= 1 ether)）。

- 2）assert	
检查条件： 内部逻辑错误（理论上不应触发的条件）。	
Gas：不退还 Gas（全部消耗，视为严重漏洞）。	
典型使用场景：检查合约 invariants（如 assert(balance >= 0)）。

- 3）revert	
检查条件：手动触发异常，可附带错误信息（类似 require 的灵活版）。	
Gas：退还剩余 Gas（同 require）。	
典型使用场景：复杂条件判断或自定义错误（如 if (!condition) revert("Error")）。


7. 某合约同时继承A和B合约，两者都有`foo()`函数：

```solidity
contract C is A, B {
    function foo() override(A,B) {...}
}
```
实际执行时会调用哪个父合约的函数？为什么？

回答：优先执行A的foo方法，因为在 Solidity 的多重继承中，当子合约 C 同时继承 A 和 B，并且两者都有 foo() 函数时，实际调用的父合约函数由继承顺序决定


8. 当使用`call`方法发送ETH时，以下两种写法有何本质区别？

```solidity
(1) addr.call{value: 1 ether}("")
(2) addr.transfer(1 ether)
```

答：
addr.call{value: 1 ether}("")：功能强大，但安全性较低，容易受到重入攻击，适用于需要目标地址执行代码的场景。
而addr.transfer(1 ether)：安全性较高，但功能有限，适用于仅需要发送以太币的场景。
在实际开发中，如果目标地址是可信的合约，并且需要执行某些逻辑，则可以使用call方法；如果目标地址是普通钱包地址，或者需要避免重入攻击，则建议使用transfer方法。
