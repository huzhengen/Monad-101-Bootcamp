## 第二章：Solidity 快速入门

### 一、填空题

1. Solidity 中存储成本最高的变量类型是`storage`变量，其数据永久存储在区块链上。
2. 使用`constant 或 immutable`关键字声明的常量可以节省 Gas 费，其值必须在编译时确定。
3. 当合约收到不带任何数据的以太转账时，会自动触发`receive`函数。

---

### 二、选择题

4. 函数选择器(selector)的计算方法是： **B)** 函数名哈希的前 4 字节

5. 以下关于 mapping 的叙述错误的是： **C)** 可以通过`length`属性获取大小

---

### 三、简答题

6. 请说明`require`、`assert`、`revert`三者的使用场景差异（从触发条件和 Gas 退还角度）

- require 用于“预期可能失败”的条件（如外部输入校验），失败时退还 Gas。

- assert 用于“绝对不应失败”的条件（如合约内部一致性），失败时消耗所有 Gas（意味着严重错误）。

- revert 类似 require，但支持更灵活的错误处理（如 if (!condition) revert CustomError();）。

7. 某合约同时继承 A 和 B 合约，两者都有`foo()`函数：

```solidity
contract C is A, B {
    function foo() override(A,B) {...}
}
```

实际执行时会调用哪个父合约的函数？为什么？

实际调用：不会执行父合约的 foo 方法
原因：C 合约重写了父合约的 foo 方法

8. 当使用`call`方法发送 ETH 时，以下两种写法有何本质区别？

```solidity
(1) addr.call{value: 1 ether}("")
(2) addr.transfer(1 ether)
```

transfer 是 Solidity 早期推荐的安全转账方法（固定 2300 Gas 防止重入），但现已被认为不够灵活（如目标合约可能因 Gas 不足失败）。

call 更灵活但风险更高，需配合防重入锁（如 nonReentrant 修饰器）使用。现代实践更推荐
