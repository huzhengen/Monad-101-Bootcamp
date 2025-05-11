## 第二章：Solidity 快速入门

### 一、填空题

1. storage
2. constant  
4. receive()

---

### 二、选择题

4. B

5. C

---

### 三、简答题

6. 请说明`require`、`assert`、`revert`三者的使用场景差异（从触发条件和Gas退还角度）
- require 都是在执行前验证条件，不满足则抛出异常。退还所有未使用的 Gas（EVM 会回退状态变化，并返还剩余 Gas 给调用者）。
- assert 要求一定要满足条件。不退还 Gas，所有已消耗的 Gas 会被扣除（视为严重漏洞）。
- revert 用来标记错误与进行回滚。退还所有未使用的 Gas（与 require 相同）。


7. 某合约同时继承A和B合约，两者都有`foo()`函数：

```solidity
contract C is A, B {
    function foo() override(A,B) {...}
}
```

实际执行时会调用哪个父合约的函数？为什么？
- 会调用C自己的函数，因为某合约同时继承A和B合约，子合约必须重写，不然会报错，且有override(A,B)


8. 当使用`call`方法发送ETH时，以下两种写法有何本质区别？

```solidity
(1) addr.call{value: 1 ether}("")
(2) addr.transfer(1 ether)
```
(1)
- call()没有gas限制，可以支持对方合约fallback()或receive()函数实现复杂逻辑。
- call()如果转账失败，不会revert。
- call()的返回值是(bool, data)，其中bool代表着转账成功或失败，需要额外代码处理一下。
(2)
- transfer()的gas限制是2300，足够用于转账，但对方合约的fallback()或receive()函数不能实现太复杂的逻辑。
- transfer()如果转账失败，会自动revert（回滚交易）。