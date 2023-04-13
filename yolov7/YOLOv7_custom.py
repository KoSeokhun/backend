# #!/usr/bin/env python
# # coding: utf-8

# # In[1]:


# from google.colab import drive

# drive.mount("/content/gdrive")

# # In[3]:


# %cd /content/gdrive/MyDrive

# # Create Directions and Clone official YOLOv7 Repo

# # In[ ]:


# import os

# if not os.path.isdir("TheCodingBug"):
#   os.makedirs("TheCodingBug")

# # In[5]:


# %cd /content/gdrive/MyDrive/Avataroad/TheCodingBug/yolov7

# # Train YOLOv7 Custom model

# # In[ ]:


# !pwd

# # In[ ]:


# !pip install -r requirements.txt

# # In[ ]:


# !pip install -r requirements_gpu.txt

# # In[ ]:


# !python train.py --workers 1 --device 0 --batch-size 16 --epochs 150 --img 640 640 --data data/custom_data.yaml --hyp data/hyp.scratch.custom.yaml --cfg cfg/training/yolov7-custom.yaml --name yolov7-custom --weights yolov7.pt

# # In[ ]:


# !pip install PyQt5==5.14.2

# # In[6]:


# !python3 counter.py --weights best.pt --conf 0.5 --source sample.mp4 --no-trace

# # In[ ]:

import subprocess

# Install PyQt5
# subprocess.run(['pip', 'install', 'PyQt5==5.14.2'])

# Run counter.py with the specified arguments
subprocess.run(['python3', 'counter.py', '--weights', 'best.pt', '--conf', '0.5', '--source', 'sample.mp4', '--no-trace'])
