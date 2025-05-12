## 第二章：Solidity 快速入门

### 一、填空题

1. Solidity中存储成本最高的变量类型是`storage`变量，其数据永久存储在区块链上。  
2. 使用`constant`关键字声明的常量可以节省Gas费，其值必须在编译时确定。  
3. 当合约收到不带任何数据的以太转账时，会自动触发`receive`函数。  

---

### 二、选择题

4. 函数选择器(selector)的计算方法是：  `B`
   **A)** sha3(函数签名)  
   **B)** 函数名哈希的前4字节  
   **C)** 函数参数的ABI编码  
   **D)** 函数返回值的类型哈希  

5. 以下关于mapping的叙述错误的是：  `C`
   **A)** 键类型可以是任意基本类型  
   **B)** 值类型支持嵌套mapping  
   **C)** 可以通过`length`属性获取大小  
   **D)** 无法直接遍历所有键值对  

---

### 三、简答题

6. 请说明`require`、`assert`、`revert`三者的使用场景差异（从触发条件和Gas退还角度）

- require：用于验证输入或条件（如require(balance >= amount)），条件不满足时回退剩余Gas。
- assert：检查不应出现的内部错误（如溢出），用于标记代码逻辑错误。在Solidity 0.8.0之前消耗所有Gas；0.8.0之后会退还剩余Gas。
- revert：无条件终止执行并回滚，可自定义错误信息（如revert("Insufficient funds")），退还剩余Gas

7. 某合约同时继承A和B合约，两者都有`foo()`函数：

```solidity
contract C is A, B {
    function foo() override(A,B) {...}
}
```

实际执行时会调用哪个父合约的函数？为什么？

答：此处C继承了A和B，并重写了foo()，并在override(A, B)指定了需要覆盖的父合约。调用C.foo()时，会调用C中foo的实现。
而对于C.foo()函数内的super.foo()语句，考虑C3线性化算法，则会调用B中foo()。

8. 当使用`call`方法发送ETH时，以下两种写法有何本质区别？

```solidity
(1) addr.call{value: 1 ether}("")
(2) addr.transfer(1 ether)
```

- call: 不自动处理异常，默认转发所有Gas，可指定Gas限制，需要检查和处理返回值，更灵活，但也需要开发者警惕重入风险。
- transfer：固定限制2300Gas，自动revert失败交易，在一定程度上可以防止重入攻击，不太灵活。