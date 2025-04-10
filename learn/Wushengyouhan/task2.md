## 第二章：Solidity 快速入门

### 一、填空题

1. Solidity中存储成本最高的变量类型是`storage`变量，其数据永久存储在区块链上。  
2. 使用`constant`关键字声明的常量可以节省Gas费，其值必须在编译时确定。  
3. 当合约收到不带任何数据的以太转账时，会自动触发`receive`函数。  

---

### 二、选择题

4. 函数选择器(selector)的计算方法是： B
   **A)** sha3(函数签名)  
   **B)** 函数名哈希的前4字节  
   **C)** 函数参数的ABI编码  
   **D)** 函数返回值的类型哈希  

5. 以下关于mapping的叙述错误的是： C
   **A)** 键类型可以是任意基本类型  
   **B)** 值类型支持嵌套mapping  
   **C)** 可以通过`length`属性获取大小  
   **D)** 无法直接遍历所有键值对  

---

### 三、简答题

6. 请说明`require`、`assert`、`revert`三者的使用场景差异（从触发条件和Gas退还角度）
require：
- 条件：用于验证输入条件或外部调用的结果。当条件不满足时触发。
- Gas退还：会退还剩余的 gas 给调用者

assert:
- 条件：用于检查内部错误和不变量。
- Gas退还：在 Solidity 0.8.0 之前不退还 gas（会消耗所有 gas）；0.8.0 之后会退还剩余gas。

revert：
- 条件：手动触发
- Gas退还：会退还剩余的 gas 给调用者

7. 某合约同时继承A和B合约，两者都有`foo()`函数：

```solidity
contract C is A, B {
    function foo() override(A,B) {...}
}
```

实际执行时会调用哪个父合约的函数？为什么？

答：实际执行时会调用合约 C 中重写的 foo() 函数，而不是父合约 A 或 B 中的函数。


8. 当使用`call`方法发送ETH时，以下两种写法有何本质区别？

```solidity
(1) addr.call{value: 1 ether}("")
(2) addr.transfer(1 ether)
```

1）**Gas 限制**
   - `addr.transfer(1 ether)` 有固定的 2300 gas 限制，这仅够用于基本的接收操作
   - `addr.call{value: 1 ether}("")` 转发所有可用的 gas，除非明确设置 gas 限制

2）**异常处理**
   - `transfer` 在失败时会自动回滚整个交易
   - `call` 不会自动回滚，它返回一个布尔值表示成功或失败，开发者需要手动检查并处理
  
3）**返回值**
   - `transfer` 没有返回值，失败时直接抛出异常
   - `call` 返回 `(bool success, bytes memory data)`，允许开发者检查调用是否成功
4）**接收方合约执行**
   - `transfer` 调用接收方的 `receive()` 或 `fallback()` 函数，但由于 gas 限制，接收方只能执行非常简单的逻辑
   - `call` 允许接收方执行更复杂的逻辑，因为它转发几乎所有的 gas
6）**适用场景**
   - `transfer` 适合简单的转账，对方是普通地址或简单合约
   - `call` 适合需要与复杂合约交互的情况，但需要额外的安全措施
