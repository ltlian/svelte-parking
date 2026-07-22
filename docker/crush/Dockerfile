FROM node:26-bookworm

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install prerequisites for Charm APT repo
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    gpg \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Add Charm repo and install Crush
RUN mkdir -p /etc/apt/keyrings \
 && curl -fsSL https://repo.charm.sh/apt/gpg.key | gpg --dearmor -o /etc/apt/keyrings/charm.gpg \
 && echo "deb [signed-by=/etc/apt/keyrings/charm.gpg] https://repo.charm.sh/apt/ * *" | tee /etc/apt/sources.list.d/charm.list \
 && apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends crush=0.86.0 \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Install dev tools
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    build-essential \
    git \
    less \
    ripgrep \
    sudo \
    vim \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# The node base image already has a 'node' user at UID 1000 (the default
# HOST_UID). Repurpose it as 'agent' so bind-mounted files are writable.
RUN usermod -l agent -d /home/agent -m node \
 && groupmod -n agent node \
 && echo "agent ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/agent \
 && chmod 0440 /etc/sudoers.d/agent \
 && git config --system --add safe.directory /workspace \
 && su - agent -c "git config --global user.name 'agent' && git config --global user.email 'agent@localhost' && git config --global core.excludesFile /home/agent/.gitignore"

RUN echo '.gitignored/' > /home/agent/.gitignore \
 && mkdir -p /workspace /home/agent/.config/crush /home/agent/.local/share/crush

# Seed config files into the crush-config named volume.
# .example files are always copied for reference; crush.json is only copied if
# the user created it (gitignored, optional). AGENTS.container.md is renamed to
# AGENTS.md so Crush picks it up via its default global_context_paths.
COPY config/ /tmp/config-seed/
RUN cp /tmp/config-seed/crush.json.example /home/agent/.config/crush/crush.json.example && \
    if [ -f /tmp/config-seed/crush.json ]; then cp /tmp/config-seed/crush.json /home/agent/.config/crush/crush.json; fi && \
    if [ -f /tmp/config-seed/AGENTS.container.md ]; then cp /tmp/config-seed/AGENTS.container.md /home/agent/.config/AGENTS.md; fi && \
    if [ -f /tmp/config-seed/CRUSH.md ]; then cp /tmp/config-seed/CRUSH.md /home/agent/.config/crush/CRUSH.md; fi && \
    rm -rf /tmp/config-seed

RUN chown -R agent:agent /workspace /home/agent/.config /home/agent/.local /home/agent/.gitignore

WORKDIR /workspace

ENV EDITOR=vim
ENV COLORTERM=truecolor

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD pgrep -f "tail -f /dev/null" > /dev/null || exit 1

ENTRYPOINT ["/entrypoint.sh"]
USER agent
CMD ["tail", "-f", "/dev/null"]
