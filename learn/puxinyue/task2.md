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

 1、 require校验一般写在被校验代码块的前面，如果条件判断是false就会抛出错误并回滚不执行后面逻辑，会返回没使用的gas费用。

 2、assert断言，触发assert时通常情况是严重错误或逻辑有问题，交易回滚不会返回gas费用。

 3、revert和require很类似但是revert可以自定义错误处理，适用于require无法覆盖的场景，触发revert时交易回滚，没使用的gas费会退还


7. 某合约同时继承A和B合约，两者都有`foo()`函数：

```solidity
contract C is A, B {
    function foo() override(A,B) {...}
}
```

实际执行时会调用哪个父合约的函数？为什么？

1、实际执行时会调用C中定义的foo()函数；因为c中的foo覆盖A和B的foo



8. 当使用`call`方法发送ETH时，以下两种写法有何本质区别？

```solidity
(1) addr.call{value: 1 ether}("")
(2) addr.transfer(1 ether)
```
1、call是低级操作可以携带附加数据，transfer不支持附加数据，纯粹用于ETH转账
2、call可以手动调整gas费比较灵活， transfer固定gas费是2300大型交易gas费过多时不适用
3、call 处理返回发错时需要手动判断，transfer失败自动抛异常，回滚交易





