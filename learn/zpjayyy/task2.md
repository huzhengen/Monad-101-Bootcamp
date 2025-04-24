## 第二章：Solidity 快速入门

### 一、填空题

1. Solidity中存储成本最高的变量类型是`storage`变量，其数据永久存储在区块链上。  
2. 使用`constant`关键字声明的常量可以节省Gas费，其值必须在编译时确定。  
4. 当合约收到不带任何数据的以太转账时，会自动触发`receive`函数。  

---

### 二、选择题

4. 函数选择器(selector)的计算方法是：A  
   **A)** sha3(函数签名)  
   **B)** 函数名哈希的前4字节  
   **C)** 函数参数的ABI编码  
   **D)** 函数返回值的类型哈希  

5. 以下关于mapping的叙述错误的是：C  
   **A)** 键类型可以是任意基本类型  
   **B)** 值类型支持嵌套mapping  
   **C)** 可以通过`length`属性获取大小  
   **D)** 无法直接遍历所有键值对  

---

### 三、简答题

6. 请说明`require`、`assert`、`revert`三者的使用场景差异（从触发条件和Gas退还角度）
   - require可以在函数执行前，做参数，条件的检查，如不满足条件，会抛出异常，会退还未使用的gas
   - assert可以用来在函数内部做本地变量的检查，如果触发，不会退还gas
   - revert可以立即抛出异常，并回滚合约的状态，可以退还未使用的gas


7. 某合约同时继承A和B合约，两者都有`foo()`函数：

```solidity
contract C is A, B {
    function foo() override(A,B) {...}
}
```

实际执行时会调用哪个父合约的函数？为什么？

实际执行合约`C`的`foo()`函数

- 合约`C`的`foo`函数添加了关键字`override`覆盖了`AB`合约的`foo()`函数
- 不会调用父合约的`foo()`函数，是为了避免歧义


8. 当使用`call`方法发送ETH时，以下两种写法有何本质区别？

```solidity
(1) addr.call{value: 1 ether}("")
(2) addr.transfer(1 ether)
```

##### `call`

1. `call`是一个底层调用，如果调用失败，不会回滚交易
2. `call`可以指定`gas`，不指定的情况下，默认就是剩余所有`gas`
3. `call`可以触发目标合约的`receive` 或 `fallback` 函数，并且可以传递参数

##### `transfer`

1. `transfer`调用失败会回滚交易
2. `transfer`不能指定gas
3. `transfer`需要目标合约实现`receive`，如果未实现，会调用失败
