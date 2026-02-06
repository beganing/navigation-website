# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd navigation-website

# 检查是否已存在 git 仓库
if [ ! -d ".git" ]; then
  git init
  git remote add origin https://github.com/beganing/navigation-website.git
fi

git add -A
git commit -m 'deploy'

# 强制推送到 gh-pages 分支
git push -f origin master:gh-pages

cd -