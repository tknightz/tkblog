---
title: 'Nvim của tôi "khá nhanh khá nguy hiểm"'
date: '2021-09-04'
summary: 'Bài viết chỉ mang tính chất khoe tốc độ của nvim.'
draft: false
tags: ['nvim', 'neovim', 'config', 'plugin']
layout: PostSimple
---

## Mất bao lâu để khởi động và sử dụng TextEditor của bạn?

<div style={{width: '100%', height: '600px', position: 'relative'}}>
  <Image src="/static/images/nvim/nvim_startup.png"  layout="fill" objectFit="contain"/>
</div>

**Well, với nvim của mình thì chỉ mất ~30ms cho màn khởi động. Chính xác là một lần đo là 27ms**

> Config của mình cài ~50 plugins nó tương đương với 50 extensions trong VSCode vậy.

## Sơ lược config

Nói sơ qua về bộ config của mình, ở đây mình dùng `neovim 0.5` (bản nightly build)
config được viết bằng `lua` thay vì bằng `vimL`. Mình mới chuyển sang dùng bản
này được vài tháng gần đây. Bản 0.5 đến bây giờ (9-2021) vẫn là bản dev, còn
bản stable vẫn là 0.4.4 (config của version < 0.5 viết bằng `vimL`).

Bản neovim 0.5 mang theo tham vọng cực lớn là thay thế `vimL` bằng
một ngôn ngữ lập trình nhanh - gọn - nhẹ và `Lua` chính là người được chọn. Vì
sao ư?

1. **Nhanh** : Tất nhiên là `Lua` nhanh hơn `vimL` của hiện tại rồi. Còn `vim 9` thì mình
   ko chắc nhé, theo kết quả benchmark của `vim 9` khá ấn tượng [ở đây](https://github.com/brammool/vim9).
   Nhưng mà dự án này bị dừng rồi thì phải. Anyway thì thời điểm này thì `Lua` vẫn nhanh hơn `vimL` gấp nhiều lần.
2. **Nhẹ** : Mã nguồn của `Lua` < 63KB - `Lua` có tiếng trong khoản này rồi, `Lua`
   thường dùng để nhúng vào các phần mềm khác, dùng làm extension... Dùng `Lua`
   để viết `Plugin` cho Vim thì đúng là chuẩn bài rồi.
3. **Gọn** : Cú pháp của `Lua` cũng đơn giản như `Python`, câu cú cũng rõ ràng.

4. Và `Lua` thì cũng được tích hợp vào runtime của `neovim` từ trước bản 0.5
   rồi.

Việc sử dụng `Lua` trong bản 0.5 đã phát triển một số `plugin` rất này nọ cho
`nvim` mà bản 0.4 stable ko dùng được. Đó là lý do mình chuyển sang dùng bản
0.5 vì nó có các `plugin` rất hay.

## Một số plugin nổi bật

### [Treesitter](https://github.com/nvim-treesitter/nvim-treesitter)

Plugin này dùng cho việc highlight syntax trong nvim, và nó đang dần được tích
hợp vào upstream của `neovim`.

Treesitter dùng tree để xác định dối tượng highlight thay vì dùng regex như
truyền thống nên nó cho tốc độ nhanh hơn. Bạn có thể xem video giới thiệu
Treesitter [ở đây](https://www.youtube.com/watch?v=a1rC79DHpmY).

Plugin này khá là mới nên nó chưa hoàn toàn ổn định trong một vài ngôn ngữ lập
trình, thỉnh thoảng vẫn bị crash (bay màu) cần phải toggle lại highlight. Nhưng
cơ bản thì nó vẫn làm rất tốt.

### [Telescope.nvim](https://github.com/nvim-telescope/telescope.nvim)

Thay thế cho `fzf` của bản 0.4. Telescope - thật sự làm được rất nhiều điều, nó
thay đổi cách làm việc bình thường của bạn luôn, kiểu như mọi thứ trong tầm tay
vậy, chỉ cần bật lên và search. Được tích hợp sẵn rất nhiều thứ ngay từ đầu:
tìm kiếm git file(diff, status, commit, stash các thứ)...

**Ví dụ cơ bản tìm file nhanh (nó tự xác định thư mục git gốc cho bạn luôn)**

<div style={{width: '100%', height: '600px', position: 'relative'}}>
    <Image src="/static/images/nvim/telescope.png" layout="fill" objectFit="contain" />
</div>

Plugin này được phát triển theo hướng mở, người dùng có thể tự tạo plugin gọi
là telescope extension để phục vụ mục đích của riêng họ.

> Self-promotion: Kể từ khi dùng nó mình có viết một vài cái extension cho `telescope` [ở đây](https://github.com/tknightz?tab=repositories)

### [LSP](https://github.com/neovim/nvim-lspconfig)

Cái này thì cũng có ở phiên bản trước rồi nhưng nhờ có `lua` thì giờ nó thực sự
bùng nổ, bỏ qua cái thời dùng `coc.nvim` ngốn CPU giờ dùng `lsp` được tích hợp vào
`nvim` cho tốc độ vừa nhanh, vừa êm,.. Hiện tại mình chỉnh config cho 5-6 ngôn
ngữ gì đó thôi (go, python, javascript, lua, html, ...)

<div style={{width: '100%', height: '600px', position: 'relative'}}>
    <Image src="/static/images/nvim/lsp.png" layout="fill" objectFit="contain" />
</div>

Cùng các plugin khác đi cùng với lsp để cho giao diện bắt mắt: trouble.nvim,
lspsaga,...

### Cùng sự tham gia của nhiều plugin khác...

---

## [?] Vậy làm sao mà nvim với 50 plugins có thể chạy trong 27ms

Câu trả lời rất đơn giản là `lazyloading` nhờ vào `packer.nvim` - plugin
manager (Plugin để quản lý các plugin khác - ở bạn 0.4 stable có thể dùng
'vim-plug' nhưng mà `lazyloading` của packer có nhiều thứ hay ho hơn nhiều).
Giờ thì cứ đúng theo cơ chế `lazyloading` thôi, mình dùng cái gì thì mình load cái đấy.
**Vào code `python` thì load extension cho `javascript` nên làm gì?**
Nên là dù cho có nhiều plugin hơn đi
chăng nữa thì thời gian khởi động của `nvim` chỉ phụ thuộc vào những plugin
`startup` (khởi động cùng hệ thống - cái này tự phải config nhé), mà mình chỉ
có tầm **10 plugin** là chạy startup thôi (icons, colorscheme, giao diện,..) còn **40 cái plugin (lazyloading)** kìa là
khi nào cần thì load, và việc load 1 cái plugin nó rất nhanh (gần như ngay tức
khắc) do đó tổng thẻ thì toàn bộ quá trình khởi động để sử dụng diễn ra khá là nhanh.
