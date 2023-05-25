import numpy as np
import cv2
from matplotlib import pyplot as plt

cascade = cv2.CascadeClassifier('bacteriadetector.xml')

img = cv2.imread('Easy_1.bmp')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
font = cv2.FONT_HERSHEY_SIMPLEX
bac = cascade.detectMultiScale(gray, 1.345, 5, 75)

for (x, y, w, h) in bac:
    img = cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

p, l, m = cv2.split(img)
img = cv2.merge([m, l, p])

print(len(bac))
cv2.imwrite('processed_image.jpg', img)

cv2.waitKey(0)
cv2.destroyAllWindows()