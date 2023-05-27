#!/usr/bin/python3
import sys
import cv2
import os

PATH_TO_TMP_IMAGES = '../server/images/service/tmp/'

cascade = cv2.CascadeClassifier('../processing/bacteriadetector.xml')

image_name = sys.argv[1]
img = cv2.imread(os.path.join(PATH_TO_TMP_IMAGES+image_name))
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
font = cv2.FONT_HERSHEY_SIMPLEX
bac = cascade.detectMultiScale(gray, 1.345, 5, 75)

for (x, y, w, h) in bac:
    img = cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

p, l, m = cv2.split(img)
img = cv2.merge([m, l, p])

print('processed-'+image_name+' : '+str(len(bac)))

cv2.imwrite(  os.path.join(PATH_TO_TMP_IMAGES+  'processed-'+image_name), img)