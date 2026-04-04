# jakeayy.xyz
A personal portfolio made by me that utilizes various techniques and modern solutions for fast and responsive website!


## Stack
- **Frontend:** [Svelte](https://svelte.dev/), [Vite (through SvelteKit)](https://vite.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Cloudflare Workers](https://workers.cloudflare.com/) (as of now currently unused)


## Contributing
> [!CAUTION]
> Before you contribute, be aware that **any low quality / AI slop pull requests will be instantly denied and user blocked from contributing**! Please respect my request when doing so.

I'm really happy to hear that you want to contribute to the website! I and possibly any contributors are working hard to make it as pleasing to navigate through as possible by applying various optimizations! Through the length of this guide I will assume you're currently on Linux.

And if you're on Windows... [¯\\\_(ツ)\_/¯](https://youtu.be/pVI_smLgTY0?t=35s)

### Prerequisites
- `<general webdev knowledge>` - Look through the [stack this project uses](#stack) to find out more about what you should expect when entering
- `git`, on most distros it's preinstalled, if it's not try:
    - `apt install git` on debian/ubuntu-based distros
    - `sudo pacman -S git` on arch-based distros
    - (...or your way of installing packages on your distro)
- [`bun`](https://bun.sh/) - Project strictly uses bun package manager, it should work with any other one but do mind that pull requests will not be accepted with multiple `package-lock` files!
- `<any mature code editor>` - I recommend using VSCode-based editor as the project contains extension recommendations that might be useful for you!

### Commands
```sh
# Clone the repo and cd into it
git clone https://github.com/jakeayy/jakeayy-xyz.git
cd jakeayy-xyz

# Install dependencies
bun install
```
Now you should be ready to conitrbute to the project! You can optionally install extensions the workspace recommend as they are generally needed when programming in Svelte


## Credits
Check [the CREDITS.md file](CREDITS.md) for any needed credits


## License
This project is running under [MIT license](LICENSE), please ensure to check licenses of other projects used here before doing anything!

If you have concerns, questions or requests that are related to licensing please contact me through solutions provided on my profile or the website.