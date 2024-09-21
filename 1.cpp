#include<bits/stdc++.h>
using namespace std;

long long ans[100]; // 使用 long long 来存储结果

// 计算某个数的位数
int highlevel(int x) {
    return x == 0 ? 1 : (int)(log10(x)) + 1;  // 显式转换类型为 int
}

// 返回位数为 x 时的数量（辅助函数）
long long f(int x) {
    if (x == 0) return 0;
    long long result = 1;  // 使用 long long 来防止溢出
    for (int i = 1; i < x; i++) {
        result *= 10;
    }
    return x * result;
}

void solve(long long n) {
    int weishu = highlevel(n);  // 获取 n 的位数
    int highnum = n / (long long)pow(10, weishu - 1);  // 获取最高位的数字

    // 对每个数字的初步处理,509为例
    for (int i = 0; i < 10; i++) {
        ans[i] += highnum * f(weishu - 1); // 5 * 00~99
    }

    // 高位数字从 0 到 highnum 的处理
    for (int i = 1; i < highnum; i++) {
        ans[i] += pow(10, weishu - 1); //100 - 199,只看头部有100个1
    }

    long long leave = n - pow(10, weishu - 1) * highnum;  // 处理剩下的部分

    int weishu1 = highlevel(leave);

    // 对 0 进行补偿处理，避免错误统计
    if(weishu1 != weishu - 1){
    	ans[0] += (weishu - 1 -weishu1) * (leave + 1);
    }

    // 递归处理剩下的部分
    if (leave > 0) {
        solve(leave);
    }
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        long long n;  // 使用 long long 来处理大数
        cin >> n;

        // 初始化结果数组
        for (int i = 0; i < 10; i++) {
            ans[i] = 0;
        }

        solve(n);


        // 输出每个数字的统计结果
        for (int i = 0; i < 10; i++) {
            cout << ans[i] << " ";
        }
        cout << endl;
    }
}
